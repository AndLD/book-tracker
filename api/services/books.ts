import { IBookBackend, IBook } from '@lib/utils/interfaces/books'
import { db } from '../services/db'
import { ObjectId } from 'mongodb'

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

export const booksService = {
    createBook,
    getBooks
}
