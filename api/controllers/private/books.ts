import { Response } from 'express'
import { booksService } from '../../services/books'
import { editionsService } from '../../services/editions'
import { IBook } from '@lib/utils/interfaces/books'
import { IBookEdition } from '@lib/utils/interfaces/bookEditions'
import { tryCatch } from '../../utils/decorators'
import { apiUtils } from '../../utils/api'
import { AuthorizedRequest } from '../../utils/types'

async function addBook(req: AuthorizedRequest, res: Response) {
    const userId = req.user?._id
    if (!userId) {
        return res.sendStatus(500)
    }
    const { book, edition }: { book: IBook; edition: IBookEdition } = req.body
    const newBook = await booksService.createBook(book, userId)
    const newEdition = await editionsService.createEdition(edition, newBook._id)
    apiUtils.sendResult(res, { book: newBook, edition: newEdition })
}

async function fetchBooks(req: AuthorizedRequest, res: Response) {
    const userId = req.user?._id
    if (!userId) {
        return res.sendStatus(500)
    }
    const books = await booksService.getBooks(userId)
    apiUtils.sendResult(res, books)
}

export const booksControllers = {
    addBook: tryCatch(addBook),
    fetchBooks: tryCatch(fetchBooks)
}
