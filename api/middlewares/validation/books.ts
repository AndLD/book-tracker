import { validate } from 'simple-express-validation'

export const validateAddBook = validate({
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
    rating: { type: 'number', required: false },
    disableRating: { type: 'boolean', required: false },
    originalTitle: { type: 'string', required: false },
    originalLn: { type: 'string', required: false },
    firstPublishedYear: { type: 'number', required: false },
    description: { type: 'string', required: false }
})
