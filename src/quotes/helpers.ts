import { HEDGER_ADDRESSES, HEDGER_URLS } from '../config'

export function isValidHedger(hedger_id: string): boolean {
  return Object.values(HEDGER_ADDRESSES).includes(hedger_id as unknown as HEDGER_ADDRESSES)
}

export function getHedgerBaseURL(hedger_id: string): string | null {
  if (hedger_id in HEDGER_URLS) {
    return HEDGER_URLS[hedger_id]
  }
  return null
}
