import { createElement } from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { AccountBox, Email, VisibilityOff } from '@material-ui/icons'

const icons = {
  username: AccountBox,
  email: Email
}

export default function Field({ name, value, onChange, type }) {
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
    />
  )
}

Field.defaultProps = {
  type: 'text'
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
}
