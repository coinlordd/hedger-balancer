import express, { Express } from 'express'
import { Server } from 'http'

import { PORT } from '../config'
import middleware from '../middleware'

export async function initializeServer(): Promise<[Server, Express]> {
  const app = express()

  middleware(app)

  const server = app.listen(PORT, () => {
    console.log(`[server]: Running on port ${PORT}`)
  })

  return [server, app]
}
