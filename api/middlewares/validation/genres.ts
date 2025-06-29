import { validate } from 'simple-express-validation'

export const validateAddGenre = validate({
    _allowedProps: ['name'],
    name: { required: true, type: 'string' }
})
