import PropTypes from 'prop-types'

export default function Form({ onSubmit, children }) {
  return <form>{children}</form>
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}
