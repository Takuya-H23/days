import { createElement, useState } from 'react'
import { Box, Grid, IconButton, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  AccountBox,
  Email,
  Visibility,
  VisibilityOff
} from '@material-ui/icons'
import useStyles from './useStyles'

const icons = {
  username: AccountBox,
  email: Email,
  password: VisibilityOff,
  text: Visibility
}

function Field({
  name,
  value,
  onChange,
  type,
  helperText,
  GridItemProps,
  ...rest
}) {
  const cls = useStyles()
  return (
    <Grid item {...GridItemProps}>
      <TextField
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        InputProps={{
          endAdornment: (
            <Box className={cls.root}>{createElement(icons[name])}</Box>
          )
        }}
        helperText={helperText}
        label={name}
        variant="outlined"
        fullWidth
        {...rest}
      />
    </Grid>
  )
}

const withPassword = Component => props => {
  const [inputType, setInputType] = useState('password')
  const handleIconClick = () =>
    setInputType(inputType === 'password' ? 'text' : 'password')

  return (
    <Component
      type={inputType}
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleIconClick}>
            {inputType === 'password' ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        )
      }}
      {...props}
    />
  )
}

Field.Password = withPassword(Field)

Field.defaultProps = {
  GridItemProps: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
  type: 'text',
  helperText: ' '
}

Field.propTypes = {
  GridItemProps: PropTypes.object,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  helperText: PropTypes.string
}

export default Field
