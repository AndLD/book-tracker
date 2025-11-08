import { createApi } from '@reduxjs/toolkit/query/react'
import { IBook } from '@lib/utils/interfaces/books'
import { IBookEdition } from '@lib/utils/interfaces/bookEditions'
import { IReading } from '@lib/utils/interfaces/readings'
import { IAuthor } from '@lib/utils/interfaces/authors'
import { baseQueryWithRefresh } from '../utils/store'

export interface ICompletedReading extends IReading {
    book: IBook;
    authors: IAuthor[];
    edition: IBookEdition;
}

export interface ICompletedBooksGroup {
    _id: number | null
    readings: ICompletedReading[]
}

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({
        getBooks: builder.query<{ result: IBook[] }, void>({
            query: () => 'api/private/books'
        }),
        addBook: builder.mutation<
            { result: { book: IBook; edition: IBookEdition } },
            {
                book: Omit<IBook, '_id' | 'createdAt' | 'userId'>
                edition: Omit<IBookEdition, '_id' | 'bookId' | 'createdAt' | 'userId'>
            }
        >({
            query: ({ book, edition }) => ({
                url: 'api/private/books',
                method: 'POST',
                body: { book, edition }
            })
        }),
        getCompletedBooks: builder.query<{ result: ICompletedBooksGroup[] }, void>({
            query: () => 'api/private/books/completed'
        })
    })
})

export const { useGetBooksQuery, useAddBookMutation, useGetCompletedBooksQuery } = booksApi
