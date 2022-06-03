import express, { Request, Response } from 'express'

import { Quote } from '../../interface.ts'
import * as QuotesController from './controllers'
import { isValidHedger } from './helpers'

export const quotesRouter = express.Router()

quotesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { instrument_id, hedger_id, batch } = req.query

    if (typeof instrument_id !== 'string') {
      throw new Error(`Query param 'instrument_id' has to be of type string: ${instrument_id}`)
    }

    if (typeof hedger_id !== 'string') {
      throw new Error(`Query param 'hedger_id' has to be of type string: ${hedger_id}`)
    } else if (!isValidHedger(hedger_id)) {
      throw new Error(`Query param 'hedger_id' is not a valid hedger: ${hedger_id}`)
    }

    let shouldBatch = batch === undefined || typeof batch !== 'string' ? false : batch

    if (shouldBatch) {
      const quotes: Quote[] = await QuotesController.getQuotesBatched(hedger_id)
      return res.status(200).json({
        success: true,
        data: quotes,
      })
    } else {
      const quote: Quote | null = await QuotesController.getQuote(instrument_id, hedger_id)
      if (quote) {
        return res.status(200).json({
          success: true,
          data: quote,
        })
      }
    }

    res.status(404).json({
      success: false,
      message: 'No quote found',
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message ?? err,
    })
  }
})
