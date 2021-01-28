import { prop, head, compose } from 'ramda'
import jwt from 'jsonwebtoken'

export const extractUser = compose(head, prop('rows'))
export const genToken = (secret, id) => jwt.sign({ id }, secret)
