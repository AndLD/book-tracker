import { ObjectId } from 'mongodb'

export interface IGenre {
    _id: string
    name: string
}

export interface IGenreBackend extends Omit<IGenre, '_id'> {
    _id: ObjectId
}
