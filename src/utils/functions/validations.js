const isPresent = s => s.trim().length > 0

const isEmail = email => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)

const isPassword = password => {
  const length = password.trim().length
  return length >= 8 && length <= 16
}

export default {
  isPresent,
  isEmail,
  isPassword
}
