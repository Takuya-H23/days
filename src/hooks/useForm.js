import { useState } from 'react'
import validations from '../utils/functions'

export default function useForm(iv) {
  const [input, setInput] = useState(iv)

  const handleChange = e => {
    const { name, value } = e.target
    setInput(cur => ({
      ...cur,
      [name]: value
    }))
  }

  const reset = () => setInput(iv)

  return [input, handleChange, reset]
}
