import React from 'react'

interface IInputProps {
  // unique id for the control
  id?: string

  // Control type
  // Default: text
  type: ControlType

  // Data is the value given by useField (react-final-form-hooks library)
  // Example data object for Email would be: { Email.input } { Email.meta }
  data?: any

  // Label text (Required)
  label?: string

  // Text max length
  maxLength?: number

  // Text min length
  minLength?: number

  // Native mobile features
  autoComplete?: string
  autoCorrect?: string
  autoCapitalize?: string
  spellCheck?: boolean

  // Specifies whether a control is required or not
  required?: boolean

  disabled?: boolean

  autoFocus?: boolean

  onInput?: any

  placeholder?: string
}

// Allowed control types
type ControlType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

const Input: React.FC<IInputProps> = (props) => {
  const { data, type, label, ...rest } = props

  const hasErrors = data?.meta?.touched && data?.meta?.error ? true : false


  return (
    <>
      <input aria-invalid={hasErrors} type={type} {...data?.input} {...rest} />
      {hasErrors && <span role="alert">{data?.meta?.error}</span>}
    </>
  )
}

const defaultProps: IInputProps = {
  data: null,
  type: 'text',
  label: '',
  autoComplete: 'off',
  autoCorrect: 'off',
  autoCapitalize: 'off',
  spellCheck: false,
}

Input.defaultProps = defaultProps

export default Input
