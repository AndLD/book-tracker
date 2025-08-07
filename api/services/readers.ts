import { IReader, IReaderBackend } from '@lib/utils/interfaces/readers'
import { db } from '../services/db'

async function createReader(readerData: Omit<IReader, '_id'>): Promise<IReaderBackend> {
    const result = await db.collection<IReaderBackend>('readers').insertOne(readerData as any)
    return { ...readerData, _id: result.insertedId }
}

async function getReaders(): Promise<IReaderBackend[]> {
    return db.collection<IReaderBackend>('readers').find({}).toArray()
}

export const readersService = {
    createReader,
    getReaders
}
