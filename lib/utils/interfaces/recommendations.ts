import { ObjectId } from 'mongodb'

export interface IRecommendation {
    _id: string
    bookId: string
    recommenderId: string
    recommendedAt: number
}

export interface IRecommendationBackend extends Omit<IRecommendation, '_id' | 'bookId' | 'recommenderId'> {
    _id: ObjectId
    bookId: ObjectId
    recommenderId: ObjectId
}
