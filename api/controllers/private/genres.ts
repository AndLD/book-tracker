import { Request, Response } from 'express'
import { genresService } from '../../services/genres'
import { IGenre } from '@lib/utils/interfaces/genres'
import { tryCatch } from '../../utils/decorators'
import { apiUtils } from '../../utils/api'

async function addGenre(req: Request, res: Response) {
    const genreData: Omit<IGenre, '_id'> = req.body
    const newGenre = await genresService.createGenre(genreData)
    apiUtils.sendResult(res, newGenre)
}

async function fetchGenres(_: Request, res: Response) {
    const genres = await genresService.getGenres()
    apiUtils.sendResult(res, genres)
}

export const genresControllers = {
    addGenre: tryCatch(addGenre),
    fetchGenres: tryCatch(fetchGenres)
}
