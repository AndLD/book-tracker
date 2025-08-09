import { ObjectId } from 'mongodb'

export interface ITag {
    _id: string
    userId: string
    label: string
    key: string
    createdAt: number
}

export interface ITagBackend extends Omit<ITag, '_id' | 'userId' | 'createdAt'> {
    _id: ObjectId
    userId: ObjectId
    label: string
    key: string
    createdAt: number
}
