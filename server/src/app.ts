import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'

import authRouter from './controllers/auth'
import LoginRouter from './controllers/login'
import logOutRouter from './controllers/logOut'
import SignupRoute from './controllers/signup'
import { requestLogger } from './utils/middleware'

const app: Application = express()
app.use(express.json())
app.use(
  cors({
    origin: true,
    credentials: true
  })
)
app.use(cookieParser())
app.use(requestLogger)
app.use('/api/login', LoginRouter)
app.use('/api/signup', SignupRoute)
app.use('/api/logout', logOutRouter)
app.use('/api/me', authRouter)
export default app
