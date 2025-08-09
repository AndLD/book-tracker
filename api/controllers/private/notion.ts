import { Request, Response } from 'express'
import { notionService } from '../../services/notion'

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
        res.json(page)
    } catch (error) {
        console.error('Error fetching Notion page:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const notionControllers = {
    getNotionPage
}
