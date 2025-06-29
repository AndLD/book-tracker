import { Router } from 'express'
import { booksControllers } from '../../controllers/private/books'

const router = Router()

import { validateAddBook } from '../../middlewares/validation/books'

router.post('/', validateAddBook, booksControllers.addBook)

export default router
