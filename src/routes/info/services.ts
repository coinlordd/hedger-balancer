import { z } from 'zod'

import { Hedger } from '../../config'
import { makeHttpRequest } from '../../utils/http'

const MarketsResponse = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.array(
    z.object({
      market_id: z.string(),
      ticker: z.string(),
      currency: z.string(),
      description: z.string(),
      sector: z.string(),
    })
  ),
})
type MarketsResponse = z.infer<typeof MarketsResponse>

export async function fetchMarkets(hedger: Hedger): Promise<MarketsResponse['data']> {
  const { href } = new URL(hedger.markets_route, hedger.http_base_url)
  const result = await makeHttpRequest(href)

  const validated = MarketsResponse.parse(result)
  if (validated.success === false) throw new Error(validated.message ?? 'Invalid response')
  return validated.data
}
