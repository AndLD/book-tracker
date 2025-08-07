import { validate } from 'simple-express-validation'

export const validateAddReader = validate({
    _allowedProps: [
        'name',
        'englishName',
        'nativeLn',
        'bio',
        'birthDate',
        'deathDate',
        'imageUrl',
        'altEmoji',
        'colorPalette',
        'rating',
        'disableRating'
    ],
    name: { required: true, type: 'string' },
    englishName: { type: 'string' },
    nativeLn: { type: 'string' },
    bio: { type: 'string' },
    birthDate: { type: 'number' },
    deathDate: { type: 'number' },
    imageUrl: { type: 'string' },
    altEmoji: { type: 'string' },
    colorPalette: { type: 'array', required: false },
    rating: { type: 'number' },
    disableRating: { type: 'boolean' }
})
