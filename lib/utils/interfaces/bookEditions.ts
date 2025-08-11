import { ObjectId } from 'mongodb'

export enum BookEditionType {
    PAPER = 'paper',
    ELECTRONIC = 'electronic',
    AUDIOBOOK = 'audiobook',
    RADIO_PLAY = 'radio_play'
}

export interface IBookEdition {
    _id?: string
    bookId?: string
    type: BookEditionType
    hoursDuration?: number
    readerIds?: string[]
    publisher?: string
    year?: number
    language?: string
    // TODO: Turn translators into translatorIds???
    translators?: string[]
    isbn?: string
    websiteUrl?: string
    fileUrl?: string
    imageUrl?: string
    altEmoji?: string
    colorPalette: string[]
    description?: string
    rating: number
    disableRating: boolean
    createdAt: number
    isHighlighted?: boolean
}

export interface IBookEditionBackend extends Omit<IBookEdition, '_id' | 'bookId' | 'readerIds'> {
    _id: ObjectId
    bookId: ObjectId
    readerIds?: ObjectId[]
}
