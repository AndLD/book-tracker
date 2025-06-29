import { ObjectId } from 'mongodb'

export type ReadingStatus = 'reading' | 'completed' | 'paused' | 'dropped'

export interface IReading {
    _id: string
    bookId: string
    bookEditionId: string
    userId: string
    startDate?: number
    endDate?: number
    comment?: string
    progress?: number
    status: ReadingStatus
}

export interface IReadingBackend extends Omit<IReading, '_id' | 'bookId' | 'userId' | 'bookEditionId'> {
    _id: ObjectId
    bookId: ObjectId
    bookEditionId: ObjectId
    userId: ObjectId
}
