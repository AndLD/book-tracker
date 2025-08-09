import { Response } from 'express'
import { readersService } from '../../services/readers'
import { IReader } from '@lib/utils/interfaces/readers'
import { tryCatch } from '../../utils/decorators'
import { apiUtils } from '../../utils/api'
import { AuthorizedRequest } from '../../utils/types'

async function addReader(req: AuthorizedRequest, res: Response) {
    const userId = req.user?._id
    if (!userId) {
        return res.sendStatus(500)
    }
    const readerData: Omit<IReader, '_id' | 'userId'> = req.body
    const newReader = await readersService.createReader(readerData, userId)
    apiUtils.sendResult(res, newReader)
}

async function fetchReaders(req: AuthorizedRequest, res: Response) {
    const userId = req.user?._id
    if (!userId) {
        return res.sendStatus(500)
    }
    const readers = await readersService.getReaders(userId)
    apiUtils.sendResult(res, readers)
}

export const readersControllers = {
    addReader: tryCatch(addReader),
    fetchReaders: tryCatch(fetchReaders)
}
