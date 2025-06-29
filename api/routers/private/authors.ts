import { Router } from 'express'
import { authorsControllers } from '../../controllers/private/authors'
import { validateAddAuthor } from '../../middlewares/validation/authors'

const router = Router()

router.post('/', validateAddAuthor, authorsControllers.addAuthor)
router.get('/', authorsControllers.fetchAuthors)

export default router
