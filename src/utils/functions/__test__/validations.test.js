import validations from '../validations'

const { isEmail, isPassword, isPresent } = validations

test.each([['lol'], ['@test.com'], ['lol@test'], ['lol@.com']])(
  'should check return false for invalid email',
  email => {
    expect(isEmail(email)).toBeFalsy()
  }
)

test.each([['hello@test.com'], ['john-doe@example.ca']])(
  'should check return false for invalid email',
  email => {
    expect(isEmail(email)).toBeTruthy()
  }
)

test.each([['myPass'], ['myPasswordLengthMustBeLessThan16']])(
  'should return false for invalid password',
  password => {
    expect(isPassword(password)).toBeFalsy()
  }
)

test.each([['my-Password'], ['pass1234'], ['hello-joh.doe']])(
  'should return true for valid password',
  password => {
    expect(isPassword(password)).toBeTruthy()
  }
)

test.each([[''], [' ']])('should return false for an empty string', arg => {
  expect(isPresent(arg)).toBeFalsy()
})

test.each([['hello'], ['john doe'], [' foo bar ']])(
  'should return true for a valid string',
  arg => {
    expect(isPresent(arg)).toBeTruthy()
  }
)
