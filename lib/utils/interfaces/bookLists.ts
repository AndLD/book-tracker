import { ObjectId } from 'mongodb'

export enum BookListType {
    PLAIN = 'plain',
    TODO = 'todo'
}

export interface IBookList {
    _id: string
    userId: string
    name: string
    type: BookListType
    books: string[]
}

export interface IBookListBackend extends Omit<IBookList, '_id' | 'userId' | 'books'> {
    _id: ObjectId
    userId: ObjectId
    books: ObjectId[]
}
