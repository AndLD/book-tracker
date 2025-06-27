import { ObjectId } from 'mongodb'

export type LogEntity =
    | 'USER'
    | 'AUTHOR'
    | 'GENRE'
    | 'BOOK'
    | 'BOOK_EDITION'
    | 'READING'
    | 'BOOK_LIST'
    | 'RECOMMENDER'
    | 'VOCABULARY_ENTRY'
    | 'REVIEW'
    | 'RECOMMENDATION'
    | 'SETTINGS'
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
