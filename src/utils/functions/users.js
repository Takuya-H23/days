import { prop, head, compose } from 'ramda'
import jwt from 'jsonwebtoken'
import IO from 'crocks/IO'
import Async from 'crocks/Async'
import { AUTH_COOKIE } from '../locale/constants'

export const cookieConfig = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24 * 7
}

const signUpQuery =
  'INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING user_id, username, email, created_at'

// extractUser:: [a] -> a
export const extractUser = compose(head, prop('rows'))

// genToken:: ({ string, string}) -> string
export const genToken = secret => id => jwt.sign({ id }, secret)

// a -> b -> IO c
export const setAuthCookie = cookies => token =>
  IO.of(token).map(token => cookies.set(AUTH_COOKIE, token, cookieConfig))

// a, b -> Async c
export const signUpUser = (pool, input) =>
  Async((rej, res) => pool.query(signUpQuery, input).then(res).catch(rej)).map(
    extractUser
  )
