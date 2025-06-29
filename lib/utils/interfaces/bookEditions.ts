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
    readers?: string[]
    publisher?: string
    year?: number
    language?: string
    // TODO: Turn translators into translatorIds???
    translators?: string[]
    isbn?: string
    imageUrl?: string
    altEmoji?: string
    colorPalette: string[]
}

export interface IBookEditionBackend extends Omit<IBookEdition, '_id' | 'bookId'> {
    _id: ObjectId
    bookId: ObjectId
}
