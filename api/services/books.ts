import { IBookBackend, IBook } from '@lib/utils/interfaces/books'
import { db } from '../services/db'
import { ObjectId } from 'mongodb'

async function createBook(bookData: IBook): Promise<IBookBackend> {
    const bookToInsert: Omit<IBookBackend, '_id'> = {
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

    const result = await db.collection<IBookBackend>('books').insertOne(bookToInsert as any)
    const bookId = result.insertedId

    return { ...bookToInsert, _id: bookId } as IBookBackend
}

export const booksService = {
    createBook
}
