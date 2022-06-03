import { Market } from '../../interface.ts'
import { makeHttpRequest } from '../../services/http'

export async function fetchMarkets(baseURL: string, hedger_id: string): Promise<Market[]> {
  try {
    const query = 'modify_this_kareem!'
    const url = new URL(query, baseURL)
    // const result = await makeHttpRequest(url.toString())

    // TODO: validate data and map against the Markets interface
    // if no Markets return empty array
    return [
      {
        id: 'XAUUSD',
        base: 'XAU',
        quote: 'USD',
        hedger: hedger_id,
      },
      {
        id: 'EURUSD',
        base: 'EUR',
        quote: 'USD',
        hedger: hedger_id,
      },
    ] as Market[]
  } catch (err) {
    throw err
  }
}
