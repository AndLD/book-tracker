import { ObjectId } from 'mongodb'

export type SettingType = ''

export interface ISettingBackend<T> extends ISettingBody<T> {
    _id: ObjectId
}

export interface ISetting<T> extends ISettingBody<T> {
    _id: string
}

export interface ISettingBody<T> {
    type: SettingType
    payload: T
}
