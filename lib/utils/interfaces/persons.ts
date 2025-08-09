import { ObjectId } from 'mongodb'

export interface IPerson {
    _id: string
    userId: string
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
    createdAt: number
}

export interface IPersonBackend extends Omit<IPerson, '_id' | 'userId'> {
    _id: ObjectId
    userId: ObjectId
}
