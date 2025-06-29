import { validate } from 'simple-express-validation'

export const validateAddEdition = validate({
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
    type: { required: true, type: 'string' },
    hoursDuration: { type: 'number', required: false },
    readers: { type: 'array', required: false },
    publisher: { type: 'string', required: false },
    year: { type: 'number', required: false },
    language: { type: 'string', required: false },
    translators: { type: 'array', required: false },
    isbn: { type: 'string', required: false },
    imageUrl: { type: 'string', required: false },
    colorPalette: { type: 'array', required: false }
})
