import { NextFunction, Request, Response } from 'express'

export type Collection = 'users' | 'logs'

export type Controller = (req: Request, res: Response, next?: NextFunction) => any

export type Error = {
    msg: string
    code: number
}

export interface AuthorizedRequest extends Request {
    user?: {
        _id: string
    }
    middlewarePayload?: {
        [key: string]: any
    }
}

export type Any = { [key: string]: any }
