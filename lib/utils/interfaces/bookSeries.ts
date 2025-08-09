import { ObjectId } from 'mongodb'

export interface IBookSeries {
    _id: string
    userId: string
    name: string
    createdAt: number
}

export interface IBookSeriesBackend extends Omit<IBookSeries, '_id' | 'userId'> {
    _id: ObjectId
    userId: ObjectId
}
