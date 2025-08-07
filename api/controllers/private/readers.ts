import { Request, Response } from 'express'
import { readersService } from '../../services/readers'
import { IReader } from '@lib/utils/interfaces/readers'
import { tryCatch } from '../../utils/decorators'
import { apiUtils } from '../../utils/api'

async function addReader(req: Request, res: Response) {
    const readerData: Omit<IReader, '_id'> = req.body
    const newReader = await readersService.createReader(readerData)
    apiUtils.sendResult(res, newReader)
}

async function fetchReaders(_: Request, res: Response) {
    const readers = await readersService.getReaders()
    apiUtils.sendResult(res, readers)
}

export const readersControllers = {
    addReader: tryCatch(addReader),
    fetchReaders: tryCatch(fetchReaders)
}
