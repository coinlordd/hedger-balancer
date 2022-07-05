require('dotenv').config()

import startup from './services/startup'
import { initializeServer } from './services/server'
import logger from './services/logger'
import initializeWebsockets from './websockets'

async function main() {
  try {
    await startup()
    const [server, app] = await initializeServer()
    initializeWebsockets(server, app)
  } catch (error) {
    logger.error(error)
  }
}

main()
