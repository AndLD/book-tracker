import { IAuthor } from './authors'
import { IBook } from './books'
import { IBookSeries } from './bookSeries'
import { IBookEdition } from './bookEditions'
import { IReading } from './readings'

export type NotionParsedData = {
    authors: Record<string, IAuthor>
    books: Record<string, IBook>
    bookSeries: Record<string, IBookSeries>
    bookEditions: Record<string, IBookEdition>
    readings: Record<string, IReading>
}
