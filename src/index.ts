import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import compression from 'compression'

import { quotesRouter } from './routes/quotes/router'
import { infoRouter } from './routes/info/router'
import { errorHandler } from './middleware/error'
import { notFoundHandler } from './middleware/not-found'
import { CORS_WHITELIST } from './config'

dotenv.config()

const PORT: number = parseInt((process.env.PORT as string) || '8080', 10)
const app = express()
app.listen(PORT, () => console.log(`Running on port ${PORT}`))

if (process.env.COMPRESSION) {
  app.use(compression())
}
app.use(helmet())

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

app.use(express.json())

app.use('/v1/quote', quotesRouter)
app.use('/v1/info', infoRouter)
app.use(errorHandler)
app.use(notFoundHandler)
