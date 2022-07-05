export const CORS_WHITELIST = ['http://localhost:3000']

export interface Hedger {
  id: string
  eth_address: string
  http_base_url: string
  ws_base_url: string
  description: string
  markets_route: string
  quotes_route: string
}

export enum HedgerID {
  DEUSFinance1 = 'deusfinance-1',
}

export const PORT = parseInt((process.env.PORT as string) || '8000', 10)

export const ALL_HEDGERS: Hedger[] = [
  {
    id: 'deusfinance-1',
    eth_address: '0x0',
    http_base_url: process.env.HF_BASE_URL!,
    ws_base_url: process.env.HF_WS_URL!,
    description: 'DEUS Finance Hedger 1',
    markets_route: '/v1/markets',
    quotes_route: '/v1/quotes',
  },
]
