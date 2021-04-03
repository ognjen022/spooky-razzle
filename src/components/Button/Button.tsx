import React from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

type VariantType = 'secondary' | 'facebook' | 'google' | 'actioned' | 'secondary2'
type ColorType = 'success' | 'ghost' | 'ghost-green'
type ButtonType = 'button' | 'submit' | 'reset'
type SizeType = 'full'

export interface IButtonProps {
  id?: string
  type?: ButtonType
  label?: string
  style?: React.CSSProperties
  disabled?: boolean
  className?: string
  tabIndex?: number
  onClick?: (event: React.MouseEvent<HTMLElement>) => void

  variant?: VariantType
  isLoading?: boolean
  color?: ColorType
  size?: SizeType
}

const Button: React.FC<IButtonProps> = (props) => {
  const { label, type, variant, color, size, disabled, className, isLoading, children, ...rest } = props

  const allowedTypes = ['button', 'submit', 'reset']
  const buttonType = type && allowedTypes.includes(type) ? type : 'button'

  const classes = classNames(styles.button, variant && styles[`button--${variant}`], color && styles[`button--${color}`], size && styles[`button--${size}-width`], className)

  const loaderSVG = (
    <svg className="icon icon-loading" role="presentation">
      <use xlinkHref="#icon-loading"></use>
    </svg>
  )

  return (
    <button type={buttonType} className={classes} disabled={disabled} aria-disabled={disabled} {...rest}>
      {isLoading ? loaderSVG : label || children}
    </button>
  )
}

const defaultProps: IButtonProps = {
  disabled: false,
  isLoading: false,
}

Button.defaultProps = defaultProps

export default Button
