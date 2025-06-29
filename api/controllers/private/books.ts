import { Request, Response } from 'express'
import { booksService } from '../../services/books'
import { editionsService } from '../../services/editions'
import { IBook } from '@lib/utils/interfaces/books'
import { IBookEdition } from '@lib/utils/interfaces/bookEditions'
import { tryCatch } from '../../utils/decorators'
import { apiUtils } from '../../utils/api'

async function addBook(req: Request, res: Response) {
    const { book, edition }: { book: IBook; edition: IBookEdition } = req.body
    const newBook = await booksService.createBook(book)
    await editionsService.createEdition(edition, newBook._id)
    apiUtils.sendResult(res, newBook)
}

export const booksControllers = {
    addBook: tryCatch(addBook)
}
