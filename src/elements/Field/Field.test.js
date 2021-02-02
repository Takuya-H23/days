import { render, screen, fireEvent } from '../../utils/test-utils'
import '@testing-library/jest-dom'
import Field from './Field'

const renderPasswordField = () =>
  render(
    <Field.Password
      onChange={jest.fn()}
      id="test-username"
      value="myValue"
      name="password"
    />
  )

test('should render password input type as default', () => {
  renderPasswordField()
  expect(screen.getByLabelText('password')).toHaveAttribute('type', 'password')
})

test('should toggle input type', () => {
  renderPasswordField()
  const btn = screen.getByRole('button')
  fireEvent.click(btn, {})

  expect(screen.getByLabelText('password')).toHaveAttribute('type', 'text')
})
