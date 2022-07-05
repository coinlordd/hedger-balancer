import { createProxyMiddleware } from 'http-proxy-middleware'
import { Server, IncomingMessage } from 'http'
import { Express } from 'express'
import internal from 'stream'

import { ALL_HEDGERS, HedgerID } from '../config'

const hedger = ALL_HEDGERS.find((hedger) => hedger.id === HedgerID.DEUSFinance1)
const internalQuoteRoute = buildQuoteRoute(hedger!.id)

export const wsProxy = createProxyMiddleware(internalQuoteRoute, {
  target: hedger!.ws_base_url,
  pathRewrite: {
    [internalQuoteRoute]: '/v1/quotes',
  },
  changeOrigin: true,
  ws: true,
})

export default (server: Server, app: Express) => {
  app.use(wsProxy)
  server.on(
    'upgrade',
    wsProxy.upgrade as unknown as (req: IncomingMessage, socket: internal.Duplex, head: Buffer) => void
  )
}

function buildQuoteRoute(hedgerId: string) {
  return `/v1/quotes/${hedgerId}`
}
