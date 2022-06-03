import { Quote } from '../../interface.ts'
import { getHedgerBaseURL } from './helpers'
import { fetchQuote, fetchQuotesBatched } from './services'

// TODO: do we need cache? If so, implement redis-cache on these functions.

export async function getQuote(instrument_id: string, hedger_id: string): Promise<Quote | null> {
  const baseURL = getHedgerBaseURL(hedger_id)
  if (!baseURL) {
    throw new Error(`Unable to map hedger_id to a trusted URL: ${hedger_id}`)
  }
  return await fetchQuote(instrument_id, baseURL)
}

export async function getQuotesBatched(hedger_id: string): Promise<Quote[]> {
  const baseURL = getHedgerBaseURL(hedger_id)
  if (!baseURL) {
    throw new Error(`Unable to map hedger_id to a trusted URL: ${hedger_id}`)
  }
  return await fetchQuotesBatched(baseURL)
}
