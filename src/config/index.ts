export const CORS_WHITELIST = ['http://localhost:3000']

export enum HEDGER_ADDRESSES {
  HF = 'hf_eth_address',
}

export const HEDGER_URLS: {
  [hedger_address: string]: string
} = {
  [HEDGER_ADDRESSES.HF]: 'https://hf-pipe.deus.finance',
}
