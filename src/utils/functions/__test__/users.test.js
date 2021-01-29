import { setAuthCookie } from '../users'
import jwt from 'jsonwebtoken'
import { AUTH_COOKIE } from '../../locale/constants'

const cookieConfig = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 6 * 60 * 60
}

const password = 'myHashedPassword'

jest.spyOn(jwt, 'sign').mockReturnValue(password)

test('should set auth cookie', () => {
  const jestCookies = { set: jest.fn() }

  setAuthCookie(jestCookies)({ id: 'id123', secret: 'my-secret' }).run()

  expect(jestCookies.set).toHaveBeenCalledWith(
    AUTH_COOKIE,
    password,
    cookieConfig
  )
})