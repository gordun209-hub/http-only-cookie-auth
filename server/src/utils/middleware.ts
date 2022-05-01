import { NextFunction, Request, Response } from 'express'

import logger from './logger'

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info('---------------------------|')
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---------------------------|')
  next()
}

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

export { requestLogger, unknownEndpoint }
