import { createElement, useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  AccountBox,
  Email,
  Visibility,
  VisibilityOff
} from '@material-ui/icons'

const icons = {
  username: AccountBox,
  email: Email,
  password: VisibilityOff,
  text: Visibility
}

function Field({ name, value, onChange, type, ...rest }) {
  return (
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      InputProps={{
        endAdornment: createElement(icons[name])
      }}
      label={name}
      variant="outlined"
      fullWidth
      {...rest}
    />
  )
}

const withPassword = Component => ({ name, value, onChange }) => {
  const [inputType, setInputType] = useState('password')
  const handleIconClick = () =>
    setInputType(inputType === 'password' ? 'text' : 'password')

  return (
    <Component
      name={name}
      value={value}
      onChange={onChange}
      type={inputType}
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleIconClick}>
            {inputType === 'password' ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        )
      }}
      label={name}
    />
  )
}

Field.Password = withPassword(Field)

Field.defaultProps = {
  type: 'text'
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
}

export default Field
