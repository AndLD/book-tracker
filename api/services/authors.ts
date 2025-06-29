import { IAuthorBackend } from '@lib/utils/interfaces/authors'
import { db } from '../services/db'

async function createAuthor(authorData: Omit<IAuthorBackend, '_id'>): Promise<IAuthorBackend> {
    const result = await db.collection<IAuthorBackend>('authors').insertOne(authorData as any)
    return { ...authorData, _id: result.insertedId }
}

async function getAuthors(): Promise<IAuthorBackend[]> {
    return db.collection<IAuthorBackend>('authors').find({}).toArray()
}

export const authorsService = {
    createAuthor,
    getAuthors
}
