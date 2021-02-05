export * as errors from './errors'

export const throwDetailError = e => {
  // eslint-disable-next-line functional/no-throw-statement
  throw new Error(e.detail || { detail: 'Something went wrong...' })
}
