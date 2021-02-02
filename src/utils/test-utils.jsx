import React from 'react'
import { render } from '@testing-library/react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ThemeProvider } from '@material-ui/core'
import { dark } from './theme'

const queryClient = new QueryClient()

const AllTheProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={dark}>{children}</ThemeProvider>
    </QueryClientProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
