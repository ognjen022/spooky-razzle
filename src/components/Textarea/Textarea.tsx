import React from 'react'

interface ITextareaProps {
  // unique id for the control
  id?: string

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

  cols: number

  rows: number

  placeholder?: string
}


const Textarea: React.FC<ITextareaProps> = (props) => {
  const { data, label, cols, rows, placeholder, ...rest } = props

  const hasErrors = data?.meta?.touched && data?.meta?.error ? true : false

  return (
    <>
      <textarea placeholder={placeholder} id={label} {...data?.input} {...rest} cols={cols} rows={rows} />
      {hasErrors && <span role="alert">{data?.meta?.error}</span>}
    </>
  )
}

const defaultProps: ITextareaProps = {
  data: null,
  label: '',
  autoComplete: 'off',
  autoCorrect: 'off',
  autoCapitalize: 'off',
  spellCheck: false,
  cols: 15,
  rows: 15,
  placeholder: ""
}

Textarea.defaultProps = defaultProps

export default Textarea
