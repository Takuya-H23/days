import validations from '../validations'

const { isPresent, isEmail } = validations

test.each([[''], [' ']])('should return false for an empty string', arg => {
  expect(isPresent(arg)).toBeFalsy()
})

test.each([['hello'], ['john doe'], [' foo bar ']])(
  'should return true for a valid string',
  arg => {
    expect(isPresent(arg)).toBeTruthy()
  }
)

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
