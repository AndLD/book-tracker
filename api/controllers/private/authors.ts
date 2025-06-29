import { Request, Response } from 'express'
import { authorsService } from '../../services/authors'
import { IAuthor } from '@lib/utils/interfaces/authors'
import { tryCatch } from '../../utils/decorators'
import { apiUtils } from '../../utils/api'

async function addAuthor(req: Request, res: Response) {
    const authorData: Omit<IAuthor, '_id'> = req.body
    const newAuthor = await authorsService.createAuthor(authorData)
    apiUtils.sendResult(res, newAuthor)
}

async function fetchAuthors(_: Request, res: Response) {
    const authors = await authorsService.getAuthors()
    apiUtils.sendResult(res, authors)
}

export const authorsControllers = {
    addAuthor: tryCatch(addAuthor),
    fetchAuthors: tryCatch(fetchAuthors)
}
