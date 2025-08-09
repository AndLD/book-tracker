import { Router } from 'express'
import { readersControllers } from '../../controllers/private/readers'
import { validateAddReader } from '../../middlewares/validation/readers'

const router = Router()

router.get('/', readersControllers.fetchReaders)
router.post('/', validateAddReader, readersControllers.addReader)

export default router
