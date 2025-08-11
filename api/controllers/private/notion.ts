import { Request, Response } from 'express'
import { notionService } from '../../services/notion'
import { tryCatch } from '../../utils/decorators'
import { apiUtils } from '../../utils/api'
import { AuthorizedRequest } from '../../utils/types'
import * as fs from 'fs'
import * as path from 'path'
import { __dirname } from '../../utils/constants'

async function getNotionPage(req: Request, res: Response) {
    const pageId = req.params.pageId
    if (!pageId) {
        return res.status(400).json({ error: 'Page ID is required' })
    }

    try {
        const page = await notionService.getPage(pageId)
        if (!page) {
            return res.status(404).json({ error: 'Page not found' })
        }
        const filePath = path.join(__dirname, '../public/notion.json')
        fs.writeFileSync(filePath, JSON.stringify(page, null, 2))
        res.json(page)
    } catch (error) {
        console.error('Error fetching Notion page:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

async function parseNotionPage(req: AuthorizedRequest, res: Response) {
    const userId = req.user?._id
    if (!userId) {
        return res.sendStatus(500)
    }

    const pageId = req.params.pageId
    if (!pageId) {
        return res.status(400).json({ error: 'Page ID is required' })
    }

    const parsedData = await notionService.parsePage(pageId, userId)
    apiUtils.sendResult(res, parsedData)
}

export const notionControllers = {
    getNotionPage: tryCatch(getNotionPage),
    parseNotionPage: tryCatch(parseNotionPage)
}
