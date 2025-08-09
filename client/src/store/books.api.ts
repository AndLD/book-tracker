import { createApi } from '@reduxjs/toolkit/query/react'
import { IBook } from '@lib/utils/interfaces/books'
import { IBookEdition } from '@lib/utils/interfaces/bookEditions'
import { baseQueryWithRefresh } from '../utils/store'

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({
        getBooks: builder.query<{ result: IBook[] }, void>({
            query: () => 'api/private/books'
        }),
        addBook: builder.mutation<
            { result: { book: IBook; edition: IBookEdition } },
            { book: Omit<IBook, '_id' | 'createdAt'>; edition: Omit<IBookEdition, '_id' | 'bookId' | 'createdAt'> }
        >({
            query: ({ book, edition }) => ({
                url: 'api/private/books',
                method: 'POST',
                body: { book, edition }
            })
        })
    })
})

export const { useGetBooksQuery, useAddBookMutation } = booksApi
