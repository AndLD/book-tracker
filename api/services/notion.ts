import { NotionAPI } from 'notion-client'
import { getLogger } from '../utils/logger'

const logger = getLogger('service/notion')

let notion: NotionAPI

async function init() {
    if (notion) {
        return
    }

    if (!process.env.NOTION_TOKEN_V2 || !process.env.NOTION_ACTIVE_USER) {
        logger.error('Notion API credentials are not set in environment variables')
        return
    }

    notion = new NotionAPI({
        activeUser: process.env.NOTION_ACTIVE_USER,
        authToken: process.env.NOTION_TOKEN_V2
    })

    logger.info('Notion API initialized')
}

async function getPage(pageId: string) {
    if (!notion) {
        logger.error('Notion API is not initialized')
        return null
    }

    try {
        const page = await notion.getPage(pageId)
        return page
    } catch (error) {
        logger.error(`Failed to fetch page with ID ${pageId}:`, error)
        return null
    }
}

export const notionService = {
    init,
    getPage
}
