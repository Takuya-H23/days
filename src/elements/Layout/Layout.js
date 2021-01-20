import PropTypes from "prop-types"
import { Grid } from "@material-ui/core"

const aside = { xs: 12, sm: 12, md: 3, lg: 3, xl: 1 }
const main = { xs: 12, sm: 12, md: 9, lg: 9, xl: 11 }

export default function Layout({ children }) {
  return (
    <Grid container>
      <Grid item {...aside}>
        <aside>aside</aside>
      </Grid>
      <Grid item {...main}>
        {children}
      </Grid>
    </Grid>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
