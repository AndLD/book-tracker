import { ObjectId } from 'mongodb'

export interface IRecommender {
    _id: string
    name: string
}

export interface IRecommenderBackend extends Omit<IRecommender, '_id'> {
    _id: ObjectId
}
