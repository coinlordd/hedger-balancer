import express, { Request, Response } from 'express'

import { ALL_HEDGERS } from '../../config'
import { isValidHedger } from '../quotes/helpers'

import * as InfoController from './controllers'

export const infoRouter = express.Router()

infoRouter.get('/hedgers', async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: ALL_HEDGERS,
  })
})

infoRouter.get('/markets', async (req: Request, res: Response) => {
  try {
    const { hedger_id } = req.query

    if (typeof hedger_id !== 'string') {
      throw new Error(`Query param 'hedger_id' has to be of type string: ${hedger_id}`)
    } else if (!isValidHedger(hedger_id)) {
      throw new Error(`Query param 'hedger_id' is not a valid hedger: ${hedger_id}`)
    }

    const markets = await InfoController.getMarkets(hedger_id)
    return res.status(200).json({
      success: true,
      data: markets,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message ?? err,
    })
  }
})
