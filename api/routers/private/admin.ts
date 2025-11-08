import { Router } from 'express'
import { adminControllers } from '../../controllers/private/admin'

const router = Router()

router.delete('/docs', adminControllers.deleteAllDocs)

export default router
