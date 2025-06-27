import { ObjectId } from 'mongodb'

export interface IReview {
    _id: string
    bookId: string
    bookEditionId: string
    userId: string
    rating: number
    title: string
    comment: string
    createdAt: number
    updatedAt: number
}

export interface IReviewBackend extends Omit<IReview, '_id' | 'bookId' | 'bookEditionId' | 'userId'> {
    _id: ObjectId
    bookId: ObjectId
    bookEditionId: ObjectId
    userId: ObjectId
}
