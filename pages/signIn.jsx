import Link from 'next/link'
import { Typography } from '@material-ui/core'
import { Layout, SignIn as SignInForm } from '../src/components'
import { ROUTES } from '../src/utils/locale/constants'

export default function SignIn() {
  return (
    <Layout>
      <Typography variant="h1">Days</Typography>
      <Typography variant="body1">Welcome back!</Typography>
      <SignInForm />
      <Typography variant="body1">
        Not have your account? Sign up from{' '}
        <Link href={ROUTES.SIGN_UP.URL}>
          <a>here</a>
        </Link>
      </Typography>
    </Layout>
  )
}
