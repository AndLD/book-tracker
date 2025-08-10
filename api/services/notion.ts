import { promises as fs } from 'fs'
import { ObjectId } from 'mongodb'
import { IAuthor } from '@lib/utils/interfaces/authors'
import { IBook } from '@lib/utils/interfaces/books'
import { IBookSeries } from '@lib/utils/interfaces/bookSeries'
import { IBookEdition, BookEditionType } from '@lib/utils/interfaces/bookEditions'
import { IReading, ReadingStatus } from '@lib/utils/interfaces/readings'
import { NotionAPI } from 'notion-client'
import { getLogger } from '../utils/logger'

const logger = getLogger('services/notion')

let notion: NotionAPI

type NotionBlock = {
    value: {
        id: string
        type: string
        properties?: {
            title?: (string | (string | (string | (string | string)[])[])[])[][]
        }
        content?: string[]
        created_time: number
    }
}

type ParsedData = {
    authors: Record<string, IAuthor>
    books: Record<string, IBook>
    bookSeries: Record<string, IBookSeries>
    bookEditions: Record<string, IBookEdition>
    readings: Record<string, IReading>
}

async function init() {
    if (notion) {
        return
    }

    if (!process.env.NOTION_TOKEN_V2 || !process.env.NOTION_ACTIVE_USER) {
        logger.error('Notion API credentials are not set in environment variables')
        return
    }

    notion = new NotionAPI({
        activeUser: process.env.NOTION_ACTIVE_USER,
        authToken: process.env.NOTION_TOKEN_V2
    })

    logger.info('Notion API initialized')
}

async function getPage(pageId: string) {
    if (!notion) {
        logger.error('Notion API is not initialized')
        return null
    }

    try {
        const page = await notion.getPage(pageId)
        return page
    } catch (error) {
        logger.error(`Failed to fetch page with ID ${pageId}:`, error)
        return null
    }
}

function parseDate(dateString: string): number {
    const [day, month, year] = dateString.split('.').map(Number)
    return new Date(year, month - 1, day).getTime()
}

function parseTitle(titleArray: any[][]): {
    text: string
    url?: string
    isSeriesHighlighted: boolean
    isTitleHighlighted: boolean
} {
    let text = ''
    let url: string | undefined
    let isSeriesHighlighted = false
    let isTitleHighlighted = false

    const fullText = titleArray.map((segment) => segment[0]).join('')
    const seriesSeparatorIndex = fullText.indexOf('//')

    let accumulatedLength = 0
    for (const segment of titleArray) {
        const segmentText = segment[0] as string
        if (segment[1]) {
            for (const format of segment[1]) {
                if (format[0] === 'a') {
                    url = format[1]
                }
                if (format[0] === 'b') {
                    if (seriesSeparatorIndex !== -1 && accumulatedLength < seriesSeparatorIndex) {
                        isSeriesHighlighted = true
                    } else {
                        isTitleHighlighted = true
                    }
                }
            }
        }
        accumulatedLength += segmentText.length
        text += segmentText
    }

    return { text, url, isSeriesHighlighted, isTitleHighlighted }
}

function parseBookEntry(titleArray: any[], block: NotionBlock, parsedData: ParsedData, userId: string, year?: number) {
    const { text: title, url: websiteUrl, isSeriesHighlighted, isTitleHighlighted } = parseTitle(titleArray)
    const regex =
        /^(?:(.+?)\s*\/\/\s*)?(.+)(?:\s*\([рp]\))?(?:\s*\((\d{4})\))?\s*-\s*(.+?)(?=\s+(?:~?\s*(?:\d{1,2}\.\d{1,2}\.\d{4}|\d{1,2}\.\d{1,2}\.\d{4}-\d{1,2}\.\d{1,2}\.\d{4}|X|x|Х|х))|$)(?:\s+([^(\n]+))?(?:\s*\((\d+(?:\.\d+)?)\)ч)?$/
    const match = title.match(regex)

    if (!match) {
        return
    }

    let [, seriesTitle, bookTitle, publishYear, authorName, dates, duration] = match

    const isDropped = title.includes('[[')
    if (isDropped) {
        bookTitle = bookTitle.replace('[[s]]', '')
    }

    const authorNames = authorName.split(',').map((name) => name.trim())
    const authorIds = authorNames.map((name) => {
        let authorId = Object.values(parsedData.authors).find((a) => a.name === name)?._id
        if (!authorId) {
            authorId = new ObjectId().toHexString()
            const newAuthor: IAuthor = {
                _id: authorId,
                userId,
                name: name,
                createdAt: block.value.created_time,
                colorPalette: [],
                rating: 0,
                disableRating: false
            }
            parsedData.authors[authorId] = newAuthor
        }
        return authorId
    })

    let bookSeriesId: string | undefined
    if (seriesTitle) {
        seriesTitle = seriesTitle.trim()
        bookSeriesId = Object.values(parsedData.bookSeries).find((bs) => bs.name === seriesTitle)?._id
        if (!bookSeriesId) {
            bookSeriesId = new ObjectId().toHexString()
            const newBookSeries: IBookSeries & { isHighlighted?: boolean } = {
                _id: bookSeriesId,
                userId,
                name: seriesTitle,
                createdAt: block.value.created_time,
                isHighlighted: isSeriesHighlighted
            }
            parsedData.bookSeries[bookSeriesId] = newBookSeries
        }
    }

    const trimmedBookTitle = bookTitle.trim()
    let bookId = Object.values(parsedData.books).find(
        (b) => b.title === trimmedBookTitle && b.authorIds.every((id) => authorIds.includes(id))
    )?._id
    if (!bookId) {
        bookId = new ObjectId().toHexString()
        const newBook: IBook = {
            _id: bookId,
            userId,
            title: trimmedBookTitle,
            authorIds: authorIds,
            genreIds: [],
            bookSeriesId,
            rating: 0,
            disableRating: false,
            createdAt: block.value.created_time
        }
        parsedData.books[bookId] = newBook
    }

    const editionType = duration
        ? BookEditionType.AUDIOBOOK
        : /\([рp]\)/.test(title)
          ? BookEditionType.RADIO_PLAY
          : BookEditionType.AUDIOBOOK

    let editionId = Object.values(parsedData.bookEditions).find(
        (e) =>
            e.bookId === bookId &&
            e.type === editionType &&
            e.year === (publishYear ? parseInt(publishYear) : undefined) &&
            e.hoursDuration === (duration ? parseFloat(duration) : undefined)
    )?._id

    if (!editionId) {
        editionId = new ObjectId().toHexString()
        const newEdition: IBookEdition = {
            _id: editionId,
            bookId,
            type: editionType,
            hoursDuration: duration ? parseFloat(duration) : undefined,
            year: publishYear ? parseInt(publishYear) : undefined,
            createdAt: block.value.created_time,
            websiteUrl,
            isHighlighted: isTitleHighlighted,
            colorPalette: [],
            rating: 0,
            disableRating: false
        }
        parsedData.bookEditions[editionId] = newEdition
    }

    if (dates) {
        const isDatesApproximate = dates.startsWith('~')
        const cleanDates = isDatesApproximate ? dates.substring(1) : dates
        const readingDates = cleanDates.split(',').map((d) => d.trim())
        for (const date of readingDates) {
            const readingId = new ObjectId().toHexString()
            let startDate: number | undefined
            let endDate: number | undefined

            if (date.includes('-')) {
                const [startStr, endStr] = date.split('-')
                startDate = parseDate(startStr)
                endDate = parseDate(endStr)
            } else if (date.toUpperCase() !== 'X') {
                endDate = parseDate(date)
            }

            const newReading: IReading = {
                _id: readingId,
                bookId,
                bookEditionId: editionId,
                userId,
                status: isDropped ? 'DROPPED' : 'COMPLETED',
                createdAt: block.value.created_time,
                startDate,
                endDate,
                year,
                isDatesApproximate
            }
            parsedData.readings[readingId] = newReading
        }
    } else {
        const readingId = new ObjectId().toHexString()
        const newReading: IReading = {
            _id: readingId,
            bookId,
            bookEditionId: editionId,
            userId,
            status: isDropped ? 'READING' : 'COMPLETED',
            createdAt: block.value.created_time,
            year
        }
        parsedData.readings[readingId] = newReading
    }
}

async function parsePage(pageId: string, userId: string): Promise<ParsedData> {
    // const page = await notionService.getPage(pageId)
    // if (!page) {
    //     throw new Error(`Failed to fetch page with ID ${pageId}`)
    // }
    // const data = JSON.stringify(page)
    const data = await fs.readFile('/Users/andrey/Documents/PetProjects/book-tracker/api/public/notion.json', 'utf-8')
    const notionData = JSON.parse(data)
    const blocks: Record<string, NotionBlock> = notionData.block

    const getBlock = (blockId: string): NotionBlock | undefined => blocks[blockId]

    const parsedData: ParsedData = {
        authors: {},
        books: {},
        bookSeries: {},
        bookEditions: {},
        readings: {}
    }

    const mainPage = Object.values(blocks).find(
        (block: any) => block.value.type === 'page' && block.value.parent_table === 'space'
    ) as NotionBlock

    if (!mainPage) {
        throw new Error('Main page not found')
    }

    const topLevelToggles = mainPage.value.content
        ?.map(getBlock)
        .filter((block): block is NotionBlock => !!block)
        .filter((block) => block.value.properties?.title?.[0]?.[0] === 'Прочитано')

    if (!topLevelToggles) {
        return parsedData
    }

    for (const toggle of topLevelToggles) {
        const yearToggles = toggle.value.content?.map(getBlock).filter((block): block is NotionBlock => !!block)

        if (!yearToggles) {
            continue
        }

        for (const yearToggle of yearToggles) {
            const yearTitle = yearToggle.value.properties?.title?.flat(Infinity).join('') || ''
            const year = /\d{4}/.test(yearTitle) ? parseInt(yearTitle) : undefined

            const bookEntries = yearToggle.value.content?.map(getBlock).filter((block): block is NotionBlock => !!block)

            if (!bookEntries) {
                continue
            }

            for (const bookEntry of bookEntries) {
                if (bookEntry.value.type === 'toggle') {
                    const nestedBookEntries = bookEntry.value.content
                        ?.map(getBlock)
                        .filter((block): block is NotionBlock => !!block)

                    if (nestedBookEntries) {
                        for (const nestedBookEntry of nestedBookEntries) {
                            const titleArray = nestedBookEntry.value.properties?.title || []
                            parseBookEntry(titleArray, nestedBookEntry, parsedData, userId, year)
                        }
                    }
                } else {
                    const titleArray = bookEntry.value.properties?.title || []
                    parseBookEntry(titleArray, bookEntry, parsedData, userId, year)
                }
            }
        }
    }

    return parsedData
}

export const notionService = {
    init,
    getPage,
    parsePage
}
