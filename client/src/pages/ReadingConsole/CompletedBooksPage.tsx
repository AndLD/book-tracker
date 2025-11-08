import { Collapse, List, Spin, Typography } from 'antd'
import { useGetCompletedBooksQuery, ICompletedReading } from '../../store/books.api'

const { Panel } = Collapse
const { Title, Text } = Typography

interface GroupedReading {
    book: ICompletedReading['book']
    authors: ICompletedReading['authors']
    edition: ICompletedReading['edition']
    readings: ICompletedReading[]
    bookSeries?: ICompletedReading['bookSeries']
}

interface FormattedReadingParts {
    seriesName: string
    bookTitle: string
    publishYear: string
    authorNames: string
    dates: string
    duration: string
    comment: string
    isDropped: boolean
    isSeriesHighlighted?: boolean
    isTitleHighlighted?: boolean
}

function formatReading(groupedReading: GroupedReading): FormattedReadingParts {
    const { book, authors, edition, readings, bookSeries } = groupedReading
    const authorNames = authors.map((author) => author.name).join(', ')
    const dates = readings
        .map((r) => {
            if (!r.endDate) return 'X'
            const date = new Date(r.endDate)
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = date.getFullYear()
            return `${day}.${month}.${year}`
        })
        .join(', ')
    const duration = edition.hoursDuration ? `(${edition.hoursDuration}ч)` : ''
    const comment = readings[readings.length - 1].comment ? `{${readings[readings.length - 1].comment}}` : ''
    const publishYear = edition.year ? `(${edition.year})` : ''
    const seriesName = bookSeries ? `${bookSeries.name} // ` : ''
    const bookTitle = book.title
    const isDropped = readings.some((r) => r.status === 'DROPPED')
    const isSeriesHighlighted = bookSeries?.isHighlighted
    const isTitleHighlighted = edition.isHighlighted

    return {
        seriesName,
        bookTitle,
        publishYear,
        authorNames,
        dates,
        duration,
        comment,
        isDropped,
        isSeriesHighlighted,
        isTitleHighlighted
    }
}

function groupReadings(readings: ICompletedReading[]): GroupedReading[] {
    const grouped: Record<string, GroupedReading> = {}

    for (const reading of readings) {
        const key = reading.book._id + reading.authors.map((a) => a._id).join('')
        if (!grouped[key]) {
            grouped[key] = {
                book: reading.book,
                authors: reading.authors,
                edition: reading.edition,
                readings: [],
                bookSeries: reading.bookSeries
            }
        }
        grouped[key].readings.push(reading)
    }

    return Object.values(grouped)
}

export default function CompletedBooksPage() {
    const { data, isLoading, isError } = useGetCompletedBooksQuery()

    if (isLoading) {
        return <Spin />
    }

    if (isError || !data) {
        return <div>Error fetching data</div>
    }

    const { result: groups } = data

    const earliestYear = groups.reduce((min, group) => {
        if (group._id === null) return min
        return group._id < min ? group._id : min
    }, new Date().getFullYear())

    const readingsWithoutYear = groups.find((group) => group._id === null)
    const readingsWithYear = groups.filter((group) => group._id !== null)

    const renderItem = (groupedReading: GroupedReading) => {
        const parts = formatReading(groupedReading)
        return (
            <List.Item>
                {parts.isSeriesHighlighted ? <Text strong>{parts.seriesName}</Text> : parts.seriesName}
                {parts.isDropped ? (
                    <Text delete>{parts.bookTitle}</Text>
                ) : parts.isTitleHighlighted ? (
                    <Text strong>{parts.bookTitle}</Text>
                ) : (
                    parts.bookTitle
                )}{' '}
                {parts.publishYear} - {parts.authorNames} [{parts.dates}] {parts.duration} {parts.comment}
            </List.Item>
        )
    }

    return (
        <div>
            <Title level={1}>Completed Books</Title>
            {readingsWithoutYear && (
                <Collapse>
                    <Panel header={`Before ${earliestYear}`} key="before">
                        <List dataSource={groupReadings(readingsWithoutYear.readings)} renderItem={renderItem} />
                    </Panel>
                </Collapse>
            )}
            <Collapse>
                {readingsWithYear.map((group) => (
                    <Panel header={group._id} key={group._id}>
                        <List dataSource={groupReadings(group.readings)} renderItem={renderItem} />
                    </Panel>
                ))}
            </Collapse>
        </div>
    )
}
