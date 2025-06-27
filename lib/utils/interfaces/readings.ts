import { ObjectId } from 'mongodb'

export interface IReading {
    _id: string
    bookId: string
    bookEditionId: string
    userId: string
    startDate?: number
    endDate?: number
    hoursListening?: number
    comment?: string
}

export interface IReadingBackend extends Omit<IReading, '_id' | 'bookId' | 'userId' | 'bookEditionId'> {
    _id: ObjectId
    bookId: ObjectId
    bookEditionId: ObjectId
    userId: ObjectId
}
