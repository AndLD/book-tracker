import { Response } from 'express'
import { booksService } from '../../services/books'
import { tryCatch } from '../../utils/decorators'
import { apiUtils } from '../../utils/api'
import { AuthorizedRequest } from '../../utils/types'

async function deleteAllDocs(req: AuthorizedRequest, res: Response) {
    await booksService.deleteAllDocs()
    res.sendStatus(200)
}

export const adminControllers = {
    deleteAllDocs: tryCatch(deleteAllDocs)
}
