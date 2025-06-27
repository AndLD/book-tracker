import { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { appSlice } from '../store/app.reducer'
import { IRefreshPostResponse } from '@lib/utils/interfaces/auth'
import { isJwtExpired } from './jwt'
import { API_URL } from './constants'

export const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).appReducer.token

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    }
})

export const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions
) => {
    const token = (api.getState() as RootState).appReducer.token

    // Handle token refresh logic with fallback
    if (token && isJwtExpired(token)) {
        const refreshResult = (await baseQuery(
            { url: '/api/public/auth/refresh', credentials: 'include' },
            api,
            extraOptions
        )) as { data?: IRefreshPostResponse }

        const token = refreshResult?.data?.result

        if (token) {
            // Store new access token
            api.dispatch(appSlice.actions.setToken(token))
        } else {
            // Handle logout with fallback
            await baseQuery({ url: '/api/public/auth/logout', method: 'POST' }, api, extraOptions)
            api.dispatch(appSlice.actions.setToken(null))
        }
    }

    // Proceed with the original request, with fallback if necessary
    return await baseQuery(args, api, extraOptions)
}
