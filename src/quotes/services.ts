import { Quote } from '../interface.ts'
import { makeHttpRequest } from '../services/http'

export async function fetchQuote(instrument_id: string, baseURL: string): Promise<Quote | null> {
  try {
    const query = 'modify_this_kareem!'
    const url = new URL(query, baseURL)
    const result = await makeHttpRequest(url.toString())

    // TODO: validate data and map against Quote
    // if no quote return null
    return result as Quote
  } catch (err) {
    throw err
  }
}

export async function fetchQuotesBatched(instrument_id: string, baseURL: string): Promise<Quote[]> {
  try {
    const query = 'modify_this_kareem!'
    const url = new URL(query, baseURL)
    const result = await makeHttpRequest(url.toString())

    // TODO: validate data and map against Quote
    // if no quote return an empty array
    return []
  } catch (err) {
    throw err
  }
}
