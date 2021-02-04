import Link from 'next/link'
import { Typography } from '@material-ui/core'
import { Layout, SignUp as SignUpForm } from '../src/components'
import { ROUTES } from '../src/utils/locale/constants'

export default function SignUp() {
  return (
    <Layout>
      <Typography variant="h1">Days</Typography>
      <Typography variant="body1">
        Start your developer tool from here!
      </Typography>
      <SignUpForm />
      <Typography variant="body1">
        Already have an account? Login from{' '}
        <Link href={ROUTES.SIGN_IN.URL}>
          <a>here</a>
        </Link>
      </Typography>
    </Layout>
  )
}
