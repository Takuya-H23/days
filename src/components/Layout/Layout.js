import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import useStyles from './useStyles'

export default function Layout({ children }) {
  const cls = useStyles()

  return (
    <Box py={5}>
      <Box className={cls.container}>{children}</Box>
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
