import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appReducer from './app.reducer'
import adminReducer from './admin.reducer'
import { privateUsersApi, publicUsersApi } from './users.api'
import { authApi } from './auth.api'
import { statisticsApi } from './statistics.api'
import { booksApi } from './books.api'
import { authorsApi } from './authors.api'
import { genresApi } from './genres.api'

const rootReducer = combineReducers({
    appReducer,
    adminReducer,
    [authApi.reducerPath]: authApi.reducer,
    [privateUsersApi.reducerPath]: privateUsersApi.reducer,
    [publicUsersApi.reducerPath]: publicUsersApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [authorsApi.reducerPath]: authorsApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(
                authApi.middleware,
                privateUsersApi.middleware,
                publicUsersApi.middleware,
                statisticsApi.middleware,
                booksApi.middleware,
                authorsApi.middleware,
                genresApi.middleware
            )
        }
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
