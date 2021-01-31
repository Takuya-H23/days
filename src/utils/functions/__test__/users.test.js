import jwt from 'jsonwebtoken'
import { setAuthCookie, extractUser, cookieConfig } from '../users'
import { AUTH_COOKIE } from '../../locale/constants'

const token = 'myToken--my_token'

test('should extract a user from rows', () => {
  expect(extractUser({ rows: [{ foo: 'bar' }, { john: 'doe' }] })).toEqual({
    foo: 'bar'
  })
})

test('should set auth cookie', () => {
  const jestCookies = { set: jest.fn() }

  setAuthCookie(jestCookies)(token).run()

  expect(jestCookies.set).toHaveBeenCalledWith(AUTH_COOKIE, token, cookieConfig)
})
