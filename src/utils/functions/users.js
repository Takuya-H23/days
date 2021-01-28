import { prop, head, compose } from 'ramda'
import jwt from 'jsonwebtoken'
import { Reader } from 'fp-utils-types'
import { COOKIE } from '../locale/constants'

const cookieConfig = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 6 * 60 * 60
}

export const extractUser = compose(head, prop('rows'))

export const genToken = (secret, id) => jwt.sign({ id }, secret)

export const setCookie = cookies => token => () =>
  cookies.set(COOKIE, token, cookieConfig)
