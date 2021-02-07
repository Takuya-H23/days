export default async function user(_, __, { isAuthenticated }) {
  console.log(isAuthenticated)
  return { username: 'hi', email: 'hi', created_at: 'hi' }
}
