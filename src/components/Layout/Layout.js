import PropTypes from "prop-types"
import { Box } from "@material-ui/core"
import useStyles from "./useStyles"

export default function Layout({ children }) {
  const cls = useStyles()

  return (
    <div>
      <div className={cls.container}>{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
