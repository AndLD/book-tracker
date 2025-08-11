import { IAuthorBackend } from '@lib/utils/interfaces/authors'
import { db } from '../services/db'
import { ObjectId } from 'mongodb'

async function createAuthor(
    authorBody: Omit<IAuthorBackend, '_id' | 'createdAt' | 'userId'>,
    userId: string
): Promise<IAuthorBackend> {
    const authorData: Omit<IAuthorBackend, '_id'> = {
        ...authorBody,
        userId: new ObjectId(userId),
        createdAt: Date.now()
    }

    const result = await db.collection<IAuthorBackend>('authors').insertOne({ ...authorData } as any)
    return { ...authorData, _id: result.insertedId }
}

async function getAuthors(userId?: string): Promise<IAuthorBackend[]> {
    const query = userId ? { userId: new ObjectId(userId) } : {}
    return db.collection<IAuthorBackend>('authors').find(query).toArray()
}

export const authorsService = {
    createAuthor,
    getAuthors
}
