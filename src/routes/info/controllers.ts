import { Hedger } from '../../config'
import { fetchMarkets } from './services'

// TODO: add caching-layer
export async function getMarkets(hedger: Hedger) {
  try {
    const result = await fetchMarkets(hedger)
    return result.map((market) => ({
      hedger_id: hedger.id,
      ...market,
    }))
  } catch (err) {
    throw err
  }
}
