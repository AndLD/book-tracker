import { ObjectId } from 'mongodb'

export type ReadingStatus = 'READING' | 'COMPLETED' | 'PAUSED' | 'DROPPED'

export interface IReading {
    _id: string
    bookId: string
    bookEditionId: string
    userId: string
    startDate?: number
    endDate?: number
    year?: number
    comment?: string
    progress?: number
    status: ReadingStatus
    createdAt: number
    isDatesApproximate?: boolean
}

export interface IReadingBackend extends Omit<IReading, '_id' | 'bookId' | 'userId' | 'bookEditionId'> {
    _id: ObjectId
    bookId: ObjectId
    bookEditionId: ObjectId
    userId: ObjectId
}
