import { getLogger } from '../utils/logger'
import { Collection } from '../utils/types'
import { db } from './db'
import { ILogBackend, ILogBody, LogAction, LogEntity } from '@lib/utils/interfaces/logs'

const logger = getLogger('service/logs')

const collection: Collection = 'logs'

let timeoutId: NodeJS.Timer | undefined
const logsQueue: ILogBody[] = []

function init() {
    timeoutId = setInterval(_processQueue, 0.5 * 60_000)
}

function addLog(log: ILogBody | ILogBody[]) {
    if (Array.isArray(log)) {
        logsQueue.push(...log)
    } else {
        logsQueue.push(log)
    }
}

async function _processQueue() {
    if (logsQueue.length === 0) return

    logger.info(`Processing logs queue. Queue size: ${logsQueue.length}`)

    // Clone and clear the queue atomically
    const batch = logsQueue.splice(0, logsQueue.length)

    await db
        .collection(collection)
        .insertMany(batch)
        .catch((err: any) => {
            console.error('Failed to insert logs batch:', err)
        })
}

function stopQueue() {
    clearInterval(timeoutId)
}

function getLogs(options: {
    fromDate: number
    toDate: number
    clusterId?: string
    logEntities: LogEntity[]
    action?: LogAction
}) {
    const query: any = {
        createdAt: { $gte: options.fromDate, $lte: options.toDate },
        entity: { $in: options.logEntities }
    }
    if (options.action) {
        query.action = options.action
    }
    if (options.clusterId) {
        query.clusterId = options.clusterId
    }

    return db.collection<ILogBackend>(collection).find(query).sort({ createdAt: 1 }).toArray()
}

export const logsService = {
    init,
    addLog,
    stopQueue,
    getLogs
}
