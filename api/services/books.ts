import { IBookBackend, IBook } from '@lib/utils/interfaces/books'
import { db } from '../services/db'
import { ObjectId } from 'mongodb'
import { IReadingBackend } from '@lib/utils/interfaces/readings'
import { NotionParsedData } from '@lib/utils/interfaces/notion'
import { entities } from '../utils/constants'

async function createBook(
    bookData: Omit<IBook, '_id' | 'createdAt' | 'userId'>,
    userId: string
): Promise<IBookBackend> {
    const bookToInsert: Omit<IBookBackend, '_id' | 'createdAt'> = {
        userId: new ObjectId(userId),
        title: bookData.title,
        authorIds: bookData.authorIds.map((id) => new ObjectId(id)),
        genreIds: bookData.genreIds.map((id) => new ObjectId(id)),
        rating: bookData.rating,
        disableRating: bookData.disableRating,
        originalTitle: bookData.originalTitle,
        originalLn: bookData.originalLn,
        firstPublishedYear: bookData.firstPublishedYear,
        description: bookData.description
    }

    const result = await db
        .collection<IBookBackend>('books')
        .insertOne({ ...bookToInsert, createdAt: Date.now() } as any)
    const bookId = result.insertedId

    return { ...bookToInsert, _id: bookId, createdAt: Date.now() } as IBookBackend
}

async function getBooks(userId?: string): Promise<IBookBackend[]> {
    const query = userId ? { userId: new ObjectId(userId) } : {}
    return db.collection<IBookBackend>('books').find(query).toArray()
}

async function getCompletedBooks(userId: string) {
    const query = { userId: new ObjectId(userId), status: 'COMPLETED' }
    const pipeline = [
        { $match: query },
        {
            $lookup: {
                from: entities.BOOKS,
                localField: 'bookId',
                foreignField: '_id',
                as: 'book'
            }
        },
        { $unwind: '$book' },
        {
            $lookup: {
                from: entities.BOOK_SERIES,
                localField: 'book.bookSeriesId',
                foreignField: '_id',
                as: 'bookSeries'
            }
        },
        {
            $unwind: {
                path: '$bookSeries',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: entities.AUTHORS,
                localField: 'book.authorIds',
                foreignField: '_id',
                as: 'authors'
            }
        },
        {
            $lookup: {
                from: entities.BOOK_EDITIONS,
                localField: 'bookEditionId',
                foreignField: '_id',
                as: 'edition'
            }
        },
        { $unwind: '$edition' },
        {
            $sort: {
                endDate: 1,
                createdAt: 1
            }
        },
        {
            $group: {
                _id: '$year',
                readings: {
                    $push: {
                        _id: '$_id',
                        status: '$status',
                        startDate: '$startDate',
                        endDate: '$endDate',
                        book: '$book',
                        authors: '$authors',
                        edition: '$edition',
                        bookSeries: '$bookSeries'
                    }
                }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]

    return db.collection<IReadingBackend>(entities.READINGS).aggregate(pipeline).toArray()
}

async function importData(parsedData: NotionParsedData) {
    const { authors, books, bookSeries, bookEditions, readings } = parsedData

    const convertedAuthors = Object.values(authors).map((author) => ({
        ...author,
        _id: new ObjectId(author._id)
    }))

    const convertedBooks = Object.values(books).map((book) => ({
        ...book,
        _id: new ObjectId(book._id),
        userId: new ObjectId(book.userId),
        authorIds: book.authorIds.map((id) => new ObjectId(id)),
        genreIds: book.genreIds.map((id) => new ObjectId(id)),
        ...(book.bookSeriesId && { bookSeriesId: new ObjectId(book.bookSeriesId) }),
        ...(book.tagIds && { tagIds: book.tagIds.map((id) => new ObjectId(id)) })
    }))

    const convertedBookSeries = Object.values(bookSeries).map((series) => ({
        ...series,
        _id: new ObjectId(series._id),
        userId: new ObjectId(series.userId)
    }))

    const convertedBookEditions = Object.values(bookEditions).map((edition) => ({
        ...edition,
        _id: new ObjectId(edition._id),
        bookId: new ObjectId(edition.bookId),
        ...(edition.readerIds && { readerIds: edition.readerIds.map((id) => new ObjectId(id)) })
    }))

    const convertedReadings = Object.values(readings).map((reading) => ({
        ...reading,
        _id: new ObjectId(reading._id),
        bookId: new ObjectId(reading.bookId),
        bookEditionId: new ObjectId(reading.bookEditionId),
        userId: new ObjectId(reading.userId)
    }))

    if (convertedAuthors.length > 0) {
        await db.collection(entities.AUTHORS).insertMany(convertedAuthors as any)
    }
    if (convertedBooks.length > 0) {
        await db.collection(entities.BOOKS).insertMany(convertedBooks as any)
    }
    if (convertedBookSeries.length > 0) {
        await db.collection(entities.BOOK_SERIES).insertMany(convertedBookSeries as any)
    }
    if (convertedBookEditions.length > 0) {
        await db.collection(entities.BOOK_EDITIONS).insertMany(convertedBookEditions as any)
    }
    if (convertedReadings.length > 0) {
        await db.collection(entities.READINGS).insertMany(convertedReadings as any)
    }
}

async function deleteAllDocs() {
    const collections = await db.listCollections().toArray()
    const collectionsToDelete = collections
        .map((c) => c.name)
        .filter((name) => !['users', 'settings', 'logs'].includes(name))

    for (const name of collectionsToDelete) {
        await db.collection(name).deleteMany({})
    }
}

export const booksService = {
    createBook,
    getBooks,
    getCompletedBooks,
    importData,
    deleteAllDocs
}
