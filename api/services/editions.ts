import { IBookEdition, IBookEditionBackend } from '@lib/utils/interfaces/bookEditions'
import { db } from '../services/db'
import { ObjectId } from 'mongodb'

async function createEdition(
    editionData: Omit<IBookEdition, '_id' | 'bookId' | 'createdAt'>,
    bookId: ObjectId
): Promise<IBookEditionBackend> {
    const { readerIds, ...restEditionData } = editionData

    const editionToInsert: Omit<IBookEditionBackend, '_id' | 'bookId'> = {
        ...restEditionData,
        colorPalette: editionData.colorPalette || [],
        ...(editionData.readerIds ? { readerIds: editionData.readerIds.map((id) => new ObjectId(id)) } : {}),
        createdAt: Date.now()
    }
    const result = await db
        .collection<IBookEditionBackend>('bookEditions')
        .insertOne({ ...editionToInsert, bookId } as any)
    return { ...editionToInsert, _id: result.insertedId, bookId } as IBookEditionBackend
}

export const editionsService = {
    createEdition
}
