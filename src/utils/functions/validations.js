const isPresent = s => s.trim().length > 0

const isEmail = email => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)

export default {
  isPresent,
  isEmail
}
