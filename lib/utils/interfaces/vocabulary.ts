import { ObjectId } from 'mongodb'

export interface IVocabularyEntry {
    _id: string
    userId: string
    bookId?: string
    word: string
    definition: string
    source?: string // e.g., book title, article name
    createdAt: number
}

export interface IVocabularyEntryBackend extends Omit<IVocabularyEntry, '_id' | 'userId' | 'bookId'> {
    _id: ObjectId
    userId: ObjectId
    bookId?: ObjectId
}
