import { Express, Router } from 'express'
import { isAuthorized } from '../middlewares/users'
import authPublicRouter from '../routers/public/auth'
import authPrivateRouter from '../routers/private/auth'
import { setReqEntity } from '../middlewares/decorators'
import { entities } from '../utils/constants'
import { statisticsPrivateRouter } from '../routers/private/statistics'
import { usersPrivateRouter } from '../routers/private/users'
import booksPrivateRouter from '../routers/private/books'
import authorsPrivateRouter from '../routers/private/authors'
import genresPrivateRouter from '../routers/private/genres'
import usersPublicRouter from '../routers/public/users'

export function setupRouters(app: Express) {
    const apiRouter = Router()
    app.use('/api', apiRouter)

    // Unauthorized router
    const publicRouter = Router()
    apiRouter.use('/public', publicRouter)

    publicRouter.use('/auth', authPublicRouter)
    publicRouter.use('/users', setReqEntity(entities.USERS), usersPublicRouter)

    // Authorized router
    const privateRouter = Router()
    apiRouter.use('/private', isAuthorized, privateRouter)

    privateRouter.use('/auth', authPrivateRouter)
    privateRouter.use('/users', usersPrivateRouter)
    privateRouter.use('/statistics', statisticsPrivateRouter)
    privateRouter.use('/books', booksPrivateRouter)
    privateRouter.use('/authors', authorsPrivateRouter)
    privateRouter.use('/genres', genresPrivateRouter)
}
