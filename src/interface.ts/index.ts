// TODO shape the Quote
export interface Quote {}

// TODO: do we want to include ISIN / CINS / CUSIP numbers?
export interface Market {
  id: string
  base_currency: string
  quote_currency: string
  is_open: boolean
  hedger_id: string
}
