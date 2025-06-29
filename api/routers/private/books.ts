import { Router } from 'express'
import { booksControllers } from '../../controllers/private/books'

const router = Router()

import { validateAddBook } from '../../middlewares/validation/books'
import { validateAddEdition } from '../../middlewares/validation/editions'

router.post('/', validateAddBook, validateAddEdition, booksControllers.addBook)

export default router
