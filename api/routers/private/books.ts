import { Router } from 'express'
import { booksControllers } from '../../controllers/private/books'
import { validateAddBook } from '../../middlewares/validation/books'

const router = Router()

router.get('/', booksControllers.fetchBooks)
router.post('/', validateAddBook, booksControllers.addBook)

export default router
