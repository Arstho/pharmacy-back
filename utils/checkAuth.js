// import { secret } from "../config.js";
import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
      try {
          const decoded = jwt.verify(token, 'secret')

          req.pharmacyId = decoded.id

          next()
      } catch (error) {
          return res.status(401).json({
              message: 'Нет доступа.',
          })
      }
  } else {
      return res.status(401).json({
          message: 'Нет доступа!',
      })
  }
}