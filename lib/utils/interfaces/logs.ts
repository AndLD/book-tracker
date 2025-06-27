import { ObjectId } from 'mongodb'

export enum LogEntity {
    USER = 'USER',
    AUTHOR = 'AUTHOR',
    GENRE = 'GENRE',
    BOOK = 'BOOK',
    BOOK_EDITION = 'BOOK_EDITION',
    READING = 'READING',
    BOOK_LIST = 'BOOK_LIST',
    RECOMMENDER = 'RECOMMENDER',
    VOCABULARY_ENTRY = 'VOCABULARY_ENTRY',
    REVIEW = 'REVIEW',
    RECOMMENDATION = 'RECOMMENDATION',
    SETTINGS = 'SETTINGS'
}
export type LogAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'SIGNIN'

export interface ILogBody {
    entity: LogEntity
    action: LogAction
    relativeId?: string | null
    targetId: string
    userId: string
    payload?: Record<string, any>
    createdAt: number
    keywords?: string[]
}

export interface ILogBackend extends ILogBody {
    _id: ObjectId
}

export interface ILog extends Omit<ILogBackend, '_id'> {
    _id: string
}
