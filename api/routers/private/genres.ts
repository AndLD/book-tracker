import { Router } from 'express'
import { genresControllers } from '../../controllers/private/genres'
import { validateAddGenre } from '../../middlewares/validation/genres'

const router = Router()

router.post('/', validateAddGenre, genresControllers.addGenre)
router.get('/', genresControllers.fetchGenres)

export default router
