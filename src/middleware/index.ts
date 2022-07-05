import express, { Express } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'

import { errorHandler } from './error'
import { notFoundHandler } from './not-found'
import { CORS_WHITELIST } from '../config'
import { infoRouter } from '../routes/info/router'

export default (app: Express) => {
  app.use(compression())
  app.use(helmet())
  app.use(express.json())

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || CORS_WHITELIST.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      optionsSuccessStatus: 200, // some legacy browsers (IE11) choke on 204
      methods: ['GET'],
    })
  )

  app.use('/v1/info', infoRouter)
  app.use(errorHandler)
  app.use(notFoundHandler)
}
