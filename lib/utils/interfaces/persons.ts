import { ObjectId } from 'mongodb'

export interface IPerson {
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

export interface IPersonBackend extends Omit<IPerson, '_id'> {
    _id: ObjectId
}
