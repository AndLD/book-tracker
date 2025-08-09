import { IReader, IReaderBackend } from '@lib/utils/interfaces/readers'
import { db } from '../services/db'
import { ObjectId } from 'mongodb'

async function createReader(
    readerBody: Omit<IReader, '_id' | 'createdAt' | 'userId'>,
    userId: string
): Promise<IReaderBackend> {
    const readerData: Omit<IReader, '_id'> = {
        ...readerBody,
        userId: new ObjectId(userId),
        createdAt: Date.now()
    }

    const result = await db.collection<IReaderBackend>('readers').insertOne({ ...readerData } as any)
    return { ...readerData, _id: result.insertedId }
}

async function getReaders(userId?: string): Promise<IReaderBackend[]> {
    const query = userId ? { userId: new ObjectId(userId) } : {}
    return db.collection<IReaderBackend>('readers').find(query).toArray()
}

export const readersService = {
    createReader,
    getReaders
}
