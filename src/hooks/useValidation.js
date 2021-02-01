import { useState } from 'react'
import { validations } from '../utils/functions'

export default function useValidation() {
  const [errors, setErrors] = useState({})

  const runValidations = input => {
    const res = Object.values(input).reduce(
      (acc, [key, value]) =>
        validations[key].run(value)
          ? acc
          : { ...acc, [key]: `Please enter a valid ${key}` },
      {}
    )
  }

  return [errors]
}
