import { User } from '@prisma/client'
import Router from 'express'
import jwt from 'jsonwebtoken'

import prisma from '../../lib/prisma'

const userInfoRouter = Router()

userInfoRouter.put('/', async (req, res) => {
  const {
    firstName,
    lastName
  }: {
    firstName: string
    lastName: string
  } = req.body
  const token = req.cookies.TRAX_ACCESS_TOKEN
  if (!token) {
    return res.sendStatus(401)
  }
  if (token) {
    let user: null | User
    try {
      const { id } = jwt.verify(token, '31') as { id: number }
      user = await prisma.user.findUnique({
        where: {
          id
        }
      })
      if (!user) {
        throw new Error('not user')
      }
    } catch (e) {
      res.status(401)
      res.json({ error: 'Invalid token' })
      return
    }
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        firstName,
        lastName
      }
    })
    res.json(user).status(200)
  }
})
export default userInfoRouter
