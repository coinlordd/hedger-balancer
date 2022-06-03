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
        base_currency: 'XAU',
        quote_currency: 'USD',
        is_open: true,
        hedger_id,
      },
      {
        id: 'EURUSD',
        base_currency: 'EUR',
        quote_currency: 'USD',
        is_open: false,
        hedger_id,
      },
    ] as Market[]
  } catch (err) {
    throw err
  }
}
