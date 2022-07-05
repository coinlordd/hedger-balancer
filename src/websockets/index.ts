import { Server } from 'http'
import { Express } from 'express'

import deusfinance1 from './deusfinance-1'

export default (server: Server, app: Express) => {
  deusfinance1(server, app)
}
