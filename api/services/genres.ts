import { IGenreBackend } from '@lib/utils/interfaces/genres'
import { db } from '../services/db'

async function createGenre(genreData: Omit<IGenreBackend, '_id'>): Promise<IGenreBackend> {
    const result = await db.collection<IGenreBackend>('genres').insertOne(genreData as any)
    return { ...genreData, _id: result.insertedId }
}

async function getGenres(): Promise<IGenreBackend[]> {
    return db.collection<IGenreBackend>('genres').find({}).toArray()
}

export const genresService = {
    createGenre,
    getGenres
}
