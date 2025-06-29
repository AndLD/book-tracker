import { validate } from 'simple-express-validation'

export const validateAddBook = validate({
    _allowedProps: ['book', 'edition'],
    book: {
        required: true,
        type: 'object',
        _allowedProps: [
            'title',
            'authorIds',
            'genreIds',
            'rating',
            'disableRating',
            'originalTitle',
            'originalLn',
            'firstPublishedYear',
            'description'
        ],
        title: { required: true, type: 'string' },
        authorIds: { required: true, type: 'array' },
        genreIds: { required: true, type: 'array' },
        rating: {
            type: 'number',
            required: false
        },
        disableRating: { type: 'boolean', required: true },
        originalTitle: { type: 'string', required: false },
        originalLn: { type: 'string', required: false },
        firstPublishedYear: { type: 'number', required: false },
        description: { type: 'string', required: false }
    },
    edition: {
        required: true,
        type: 'object',
        _allowedProps: [
            'type',
            'hoursDuration',
            'readers',
            'publisher',
            'year',
            'language',
            'translators',
            'isbn',
            'imageUrl',
            'colorPalette'
        ],
        // type: { required: true, type: 'string' },
        hoursDuration: { type: 'number', required: false },
        readers: { type: 'array', required: false },
        publisher: { type: 'string', required: false },
        year: { type: 'number', required: false },
        language: { type: 'string', required: false },
        translators: { type: 'array', required: false },
        isbn: { type: 'string', required: false },
        imageUrl: { type: 'string', required: false },
        colorPalette: { type: 'array', required: false }
    }
})
