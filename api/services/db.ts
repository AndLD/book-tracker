import { MongoClient, Db } from 'mongodb'
import { getLogger } from '../utils/logger'

export let mongoClient: MongoClient
export let db: Db

const logger = getLogger('services/db')

async function init() {
    if (!process.env.MONGO_DB_URI || !process.env.MONGO_DB_NAME) {
        logger.error('MongoDB initialization failed: MONGO_DB_URI or MONGO_DB_NAME not found')
        return
    }

    mongoClient = new MongoClient(process.env.MONGO_DB_URI)
    await mongoClient.connect()
    db = mongoClient.db(process.env.MONGO_DB_NAME)

    logger.info('MongoDB successfully connected')
}

export const dbService = {
    init
}
