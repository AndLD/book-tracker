import { IBookEdition, IBookEditionBackend } from '@lib/utils/interfaces/bookEditions'
import { db } from '../services/db'
import { ObjectId } from 'mongodb'

async function createEdition(
    editionData: Omit<IBookEdition, '_id' | 'bookId'>,
    bookId: ObjectId
): Promise<IBookEditionBackend> {
    const editionToInsert: Omit<IBookEditionBackend, '_id' | 'bookId'> = {
        ...editionData,
        colorPalette: editionData.colorPalette || []
    }
    const result = await db
        .collection<IBookEditionBackend>('bookEditions')
        .insertOne({ ...editionToInsert, bookId } as any)
    return { ...editionToInsert, _id: result.insertedId, bookId } as IBookEditionBackend
}

export const editionsService = {
    createEdition
}
