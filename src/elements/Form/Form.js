import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'

export default function Form({ onSubmit, children, GridContainerProps }) {
  return (
    <Grid
      container
      onSubmit={onSubmit}
      {...GridContainerProps}
      component="form"
    >
      {children}
    </Grid>
  )
}

Form.defaultProps = {
  GridContainerProps: {}
}

Form.propTypes = {
  GridContainerProps: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}
