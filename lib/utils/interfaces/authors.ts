import { ObjectId } from 'mongodb'

export interface IAuthor {
    _id: string
    name: string
    englishName?: string
    nativeLn?: string
    bio?: string
    birthDate?: number
    deathDate?: number
    imageUrl?: string
    altEmoji?: string
    colorPalette: string[]
    rating: number
    disableRating: boolean
}

export interface IAuthorBackend extends Omit<IAuthor, '_id'> {
    _id: ObjectId
}
