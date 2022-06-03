import { Market } from '../../interface.ts'
import { getHedgerBaseURL } from '../quotes/helpers'
import { fetchMarkets } from './services'

// TODO: implement caching layer.
export async function getMarkets(hedger_id: string): Promise<Market[]> {
  const baseURL = getHedgerBaseURL(hedger_id)
  if (!baseURL) {
    throw new Error(`Unable to map hedger_id to a trusted URL: ${hedger_id}`)
  }
  return await fetchMarkets(baseURL, hedger_id)
}
