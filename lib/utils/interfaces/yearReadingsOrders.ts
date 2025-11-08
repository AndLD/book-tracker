import { ObjectId } from 'mongodb'

export interface IYearReadingsOrder {
    _id: string
    userId: string
    year: number | null
    orderedReadingIds: string[]
}

export interface IYearReadingsOrderBackend extends Omit<IYearReadingsOrder, '_id' | 'userId' | 'orderedReadingIds'> {
    _id: ObjectId
    userId: ObjectId
    orderedReadingIds: ObjectId[]
}
