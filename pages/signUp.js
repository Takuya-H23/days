import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, LinearProgress, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { isEmpty } from 'ramda'
import { Layout, SignUp as SignUpForm } from '../src/components'
import { useForm, useSignUp } from '../src/hooks'
import { validations } from '../src/utils/functions'
import { ROUTES } from '../src/utils/locale/constants'

const iv = { username: '', email: '', password: '' }

export default function SignUp() {
  return (
    <Layout>
      {/* {mutation.isLoading && <LinearProgress />} */}
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
