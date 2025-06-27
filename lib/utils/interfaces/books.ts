import { ObjectId } from 'mongodb'

export interface IBook {
    _id: string
    title: string
    authorIds: string[]
    genreIds: string[]
    rating: number
    disableRating: boolean
}

export interface IBookBackend extends Omit<IBook, '_id' | 'authorIds' | 'genreIds'> {
    _id: ObjectId
    authorIds: ObjectId[]
    genreIds: ObjectId[]
}
