import { prop, head, compose } from 'ramda'
import jwt from 'jsonwebtoken'
import IO from 'crocks/IO'
import { AUTH_COOKIE } from '../locale/constants'

export const cookieConfig = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 6 * 60 * 60
}

// extractUser:: [a] -> a
export const extractUser = compose(head, prop('rows'))

// genToken:: ({ string, string}) -> string
const genToken = ({ id, secret }) => jwt.sign({ id }, secret)

// a -> b -> IO c
export const setAuthCookie = cookies => config =>
  IO.of(config)
    .map(genToken)
    .map(token => cookies.set(AUTH_COOKIE, token, cookieConfig))
