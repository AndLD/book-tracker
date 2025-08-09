import { Router } from 'express'
import { notionControllers } from '../../controllers/private/notion'

const router = Router()

router.get('/:pageId', notionControllers.getNotionPage)

export default router
