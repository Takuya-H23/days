import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { Field, Form } from '../../elements'

export default function SignUpForm({ errors, input, handleChange, onSubmit }) {
  return (
    <Form onSubmit={onSubmit} GridContainerProps={{ spacing: 1 }}>
      <Field
        name="username"
        onChange={handleChange}
        value={input.username}
        error={Boolean(errors.username)}
        helperText={errors.username || ' '}
      />
      <Field
        name="email"
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email || ' '}
        value={input.email}
        type="email"
      />
      <Field.Password
        name="password"
        onChange={handleChange}
        value={input.password}
        error={Boolean(errors.password)}
        helperText="Password must contain 8 to 16 characters"
      />
      <Button variant="contained" type="submit" onClick={onSubmit}>
        Sign up
      </Button>
    </Form>
  )
}

SignUpForm.propTypes = {}
