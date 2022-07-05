import express, { Request, Response } from 'express'

import { ALL_HEDGERS } from '../../config'
import * as InfoController from './controllers'

export const infoRouter = express.Router()

infoRouter.get('/hedgers', async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: ALL_HEDGERS.map((hedger) => ({
      id: hedger.id,
      eth_address: hedger.eth_address,
      description: hedger.description,
    })),
  })
})

infoRouter.get('/markets', async (req: Request, res: Response) => {
  try {
    const { hedger_id } = req.query

    if (typeof hedger_id !== 'string') {
      throw new Error(`Query param 'hedger_id' has to be of type string: ${hedger_id}`)
    }

    const hedger = ALL_HEDGERS.find((hedger) => hedger.id === hedger_id)
    if (!hedger) {
      throw new Error(`Query param 'hedger_id' is not a valid hedger: ${hedger_id}`)
    }

    const markets = await InfoController.getMarkets(hedger)
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
