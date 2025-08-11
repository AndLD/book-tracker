import { Response } from 'express'
import { authorsService } from '../../services/authors'
import { IAuthor } from '@lib/utils/interfaces/authors'
import { tryCatch } from '../../utils/decorators'
import { apiUtils } from '../../utils/api'
import { AuthorizedRequest } from '../../utils/types'

async function addAuthor(req: AuthorizedRequest, res: Response) {
    const userId = req.user?._id
    if (!userId) {
        return res.sendStatus(500)
    }
    const authorData: Omit<IAuthor, '_id' | 'userId'> = req.body
    const newAuthor = await authorsService.createAuthor(authorData, userId)
    apiUtils.sendResult(res, newAuthor)
}

async function fetchAuthors(req: AuthorizedRequest, res: Response) {
    const userId = req.user?._id
    if (!userId) {
        return res.sendStatus(500)
    }
    const authors = await authorsService.getAuthors(userId)
    apiUtils.sendResult(res, authors)
}

export const authorsControllers = {
    addAuthor: tryCatch(addAuthor),
    fetchAuthors: tryCatch(fetchAuthors)
}
