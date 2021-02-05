import { Predicate } from 'fp-utils-types'

export const isPresent = s => s.trim().length > 0

export const isEmail = email => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)

export const isPassword = password => {
  const length = password.trim().length
  return length >= 8 && length <= 16
}

export const validations = {
  username: Predicate.of(isPresent),
  email: Predicate.of(isPresent).concat(Predicate.of(isEmail)),
  password: Predicate.of(isPresent).concat(Predicate.of(isPassword))
}

export const validate = input =>
  Object.entries(input).reduce(
    (acc, [key, value]) =>
      validations[key].run(value)
        ? acc
        : { ...acc, [key]: `Please enter a valid ${key}` },
    {}
  )

export default validate
