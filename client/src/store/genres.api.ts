import { createApi } from '@reduxjs/toolkit/query/react'
import { IGenre } from '@lib/utils/interfaces/genres'
import { baseQueryWithRefresh } from '../utils/store'

export const genresApi = createApi({
    reducerPath: 'genresApi',
    baseQuery: baseQueryWithRefresh,
    tagTypes: ['Genre'],
    endpoints: (builder) => ({
        addGenre: builder.mutation<{ result: IGenre }, Omit<IGenre, '_id'>>({
            query: (genre) => ({
                url: 'api/private/genres',
                method: 'POST',
                body: genre
            }),
            invalidatesTags: ['Genre']
        }),
        getGenres: builder.query<{ result: IGenre[] }, void>({
            query: () => 'api/private/genres',
            providesTags: ['Genre']
        })
    })
})

export const { useAddGenreMutation, useGetGenresQuery } = genresApi
