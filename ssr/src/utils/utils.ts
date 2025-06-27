import { Axios } from 'axios'
import { isProduction, publicApiUrl } from './constants'

export const csrLink = (url: string) => `${isProduction ? '' : 'http://localhost:5173'}${url}`
const apiLink = (url: string) => `${process.env.NEXT_PUBLIC_API_URL}${url}`
export const publicApi = new Axios({ baseURL: apiLink(publicApiUrl), headers: { 'Content-Type': 'application/json' } })
