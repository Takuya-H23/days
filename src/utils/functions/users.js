import { prop, head, compose } from 'ramda'
import jwt from 'jsonwebtoken'
import { Reader } from 'fp-utils-types'
import { COOKIE } from '../locale/constants'

const cookieConfig = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 6 * 60 * 60
}

// extractUser:: [a] -> a
export const extractUser = compose(head, prop('rows'))

// genToken:: ({ string, string}) -> string
const genToken = ({ id, secret }) => jwt.sign({ id }, secret)

// setCookie:: a -> string -> (_ -> _)
const setCookie = cookies => token => () =>
  cookies.set(COOKIE, token, cookieConfig)

// setAuthCookie:: a -> b -> (_ -> _)
export const setAuthCookie = cookie => compose(setCookie(cookie), genToken)
