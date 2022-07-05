import { createProxyMiddleware } from 'http-proxy-middleware'
import { Server, IncomingMessage } from 'http'
import { Express } from 'express'
import internal from 'stream'

import { ALL_HEDGERS, HedgerID } from '../config'

const hedger = ALL_HEDGERS.find((hedger) => hedger.id === HedgerID.DEUSFinance1)

export const wsProxy = createProxyMiddleware(hedger!.quotes_route, {
  target: hedger!.ws_base_url,
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
