import { ObjectId } from 'mongodb'

export interface IBook {
    _id: string
    userId: string
    bookSeriesId?: string
    title: string
    authorIds: string[]
    genreIds: string[]
    tagIds?: string[]
    rating: number
    disableRating: boolean
    originalTitle?: string
    originalLn?: string
    firstPublishedYear?: number
    description?: string
    createdAt: number
}

export interface IBookBackend extends Omit<IBook, '_id' | 'authorIds' | 'genreIds' | 'userId' | 'bookSeriesId' | 'tagIds'> {
    _id: ObjectId
    userId: ObjectId
    bookSeriesId?: ObjectId
    authorIds: ObjectId[]
    genreIds: ObjectId[]
    tagIds?: ObjectId[]
}
