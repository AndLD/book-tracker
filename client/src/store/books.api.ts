import { createApi } from '@reduxjs/toolkit/query/react'
import { IBook } from '@lib/utils/interfaces/books'
import { IBookEdition } from '@lib/utils/interfaces/bookEditions'
import { baseQueryWithRefresh } from '../utils/store'

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({
        addBook: builder.mutation<
            { result: { book: IBook; edition: IBookEdition } },
            { book: Omit<IBook, '_id'>; edition: Omit<IBookEdition, '_id' | 'bookId'> }
        >({
            query: ({ book, edition }) => ({
                url: 'api/private/books',
                method: 'POST',
                body: { book, edition }
            })
        })
    })
})

export const { useAddBookMutation } = booksApi
