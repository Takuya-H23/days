import PropTypes from 'prop-types'
import { Grid, Box } from '@material-ui/core'
import Aside from '../Aside'

const aside = { xs: 12, sm: 12, md: 3, lg: 3, xl: 1 }
const main = { xs: 12, sm: 12, md: 9, lg: 9, xl: 11 }

export default function DashboardLayout({ children }) {
  return (
    <Grid container>
      <Grid item {...aside}>
        <Box p={[2, 2, 2, 2, 2]}>
          <Aside />
        </Box>
      </Grid>
      <Grid item {...main}>
        <Box p={[2, 2, 2, 2, 2]}>{children}</Box>
      </Grid>
    </Grid>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
}
