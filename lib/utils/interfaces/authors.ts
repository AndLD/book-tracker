import { ObjectId } from 'mongodb'

export interface IAuthor {
    _id: string
    name: string
    bio?: string
    birthDate?: number
    deathDate?: number
}

export interface IAuthorBackend extends Omit<IAuthor, '_id'> {
    _id: ObjectId
}
