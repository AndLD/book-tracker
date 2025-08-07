import { IReader } from '@lib/utils/interfaces/readers'
import { baseQueryWithRefresh } from '../utils/store'
import { createApi } from '@reduxjs/toolkit/dist/query/react'

export const readersApi = createApi({
    reducerPath: 'readersApi',
    baseQuery: baseQueryWithRefresh,
    tagTypes: ['Reader'],
    endpoints: (builder) => ({
        addReader: builder.mutation<{ result: IReader }, Omit<IReader, '_id'>>({
            query: (reader) => ({
                url: 'api/private/readers',
                method: 'POST',
                body: reader
            }),
            invalidatesTags: ['Reader']
        }),
        getReaders: builder.query<{ result: IReader[] }, void>({
            query: () => 'api/private/readers',
            providesTags: ['Reader']
        })
    })
})

export const { useAddReaderMutation, useGetReadersQuery } = readersApi
