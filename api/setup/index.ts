import httpServer from 'http'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })
import { getLogger } from '../utils/logger'
import { setupServer } from './server'
import { dbService, mongoClient } from '../services/db'
import { emailService } from '../services/email'
import { usersService } from '../services/users'
import { cronService } from '../services/cron'
import packageJson from '../package.json'
import { __dirname, environment } from '../utils/constants'
import { logsService } from '../services/logs'
import fs from 'fs'
import { notionService } from '../services/notion'

const logger = getLogger('setup/index')

const port = process.env.PORT || 8080
let server: httpServer.Server | null = null

export async function startApp() {
    logger.info(`${packageJson.name} ${packageJson.version}. Starting app...`)

    server = setupServer()

    await dbService.init()
    emailService.init()

    logsService.init()
    cronService.addJob(usersService.deleteInactiveUsers, 1)
    const staticFolderExists = fs.existsSync(__dirname + '/../public')
    if (!staticFolderExists) {
        fs.mkdirSync(__dirname + '/../public')
    }

    notionService.init()

    server.listen(port, () => {
        logger.info(`Server has been started on ${port}, env=${environment}`)
    })
}

export async function stopApp() {
    cronService.stop()
    emailService.stop()

    if (server) {
        server.close()
    }

    await mongoClient.close()
}
