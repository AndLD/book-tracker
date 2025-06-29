import { createApi } from '@reduxjs/toolkit/query/react'
import { IAuthor } from '@lib/utils/interfaces/authors'
import { baseQueryWithRefresh } from '../utils/store'

export const authorsApi = createApi({
    reducerPath: 'authorsApi',
    baseQuery: baseQueryWithRefresh,
    tagTypes: ['Author'],
    endpoints: (builder) => ({
        addAuthor: builder.mutation<{ result: IAuthor }, Omit<IAuthor, '_id'>>({
            query: (author) => ({
                url: 'api/private/authors',
                method: 'POST',
                body: author
            }),
            invalidatesTags: ['Author']
        }),
        getAuthors: builder.query<{ result: IAuthor[] }, void>({
            query: () => 'api/private/authors',
            providesTags: ['Author']
        })
    })
})

export const { useAddAuthorMutation, useGetAuthorsQuery } = authorsApi
