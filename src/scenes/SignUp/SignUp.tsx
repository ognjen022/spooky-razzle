import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, useField } from 'react-final-form-hooks'
import { useDispatch, useSelector } from 'react-redux'

import styles from './SignUp.module.scss'

import { regexEmail, regexStrongPassword } from '../../utils/utils'
import { signupRequestedEvent } from '../../services/userSecurity/signup/events'
import { RootState } from '../../services/RootState'

import GoogleLogo from '../../svg/images/google-logo.svg'
import FacebookLogo from '../../svg/images/facebook-logo.svg'

import LayoutDefault from '../../layouts/LayoutDefault/LayoutDefault'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { selectError, selectIsSubmitting } from '../../services/userSecurity/signup/selectors'
import { Divider } from '@material-ui/core'
import { accountToggleLoginEvent, accountToggleSignupEvent } from '../../services/userSecurity/accountDetails/events'

export interface ISignUpFormValues {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  password: string | undefined
  join: boolean | undefined
}

const SignUp = () => {
  let dispatch = useDispatch()

  let errorText = useSelector<RootState, string>(state => selectError(state.userSecurity.signup))
  let isSubmitting = useSelector<RootState, boolean>(state => selectIsSubmitting(state.userSecurity.signup))

  // Submit form
  const onSubmit = async (payload: any) => {
    console.log(joinValue);
    dispatch(signupRequestedEvent(payload.firstName, payload.lastName, payload.email, payload.password, joinValue))
  }

  const [joinValue, setJoinValue] = useState(true);


  // Create form
  const { form, handleSubmit } = useForm({ onSubmit, validate })

  // Create form fields
  const firstName = useField('firstName', form)
  const lastName = useField('lastName', form)
  const email = useField('email', form)
  const password = useField('password', form)
  const join = useField('join', form)

  const onLogin = () => {
    dispatch(accountToggleLoginEvent())
    dispatch(accountToggleSignupEvent())
  }
  return (
    <div className={styles['signup-new']} onMouseDown={e => e.stopPropagation()}>
      <div className={styles['signup-new__content']}>
        <div className={styles['signup-new__form-header']}>
          <h2>Sign Up</h2>
        </div>
        <form className={styles['signup-new__form-container']} onSubmit={handleSubmit}>
          <div className={styles['signup-new__form']}>
            <p>
              <Input data={firstName} label="firstName" placeholder="First name" aria-label="First name" type="text" required />
            </p>
            <p>
              <Input data={lastName} label="lastName" placeholder="Last name" aria-label="Last name" type="text" required />
            </p>
            <p>
              <Input data={email} label="email" placeholder="Email" aria-label="Email" type="email" required />
            </p>
            <p>
              <Input data={password} label="password" placeholder="Password" aria-label="Password" type="password" required />
            </p>
            <p className={styles['signup-new__form-join']}>
                <input
                  type="checkbox"
                  id={join.input.name}
                  value={`${joinValue}`}
                  checked={joinValue}
                  onChange={() => { }}
                />

                <label htmlFor="join" onClick={() => setJoinValue(!joinValue)}>
                  Join our community
                </label>
              </p>
            <div className={styles['signup-new__form-actions']}>
              
              <p>
                <Button
                  type="submit"
                  variant="secondary"
                  color="success"
                  label="Sign Up"
                  size="full"
                  isLoading={isSubmitting}
                />
              </p>
              <div className={styles['signup-new__tos-links']}>
              	<p>By creating an account, you are agreeing to our <Link to="/terms-of-service">Terms</Link> and <Link to="/privacy-policy">Privacy Policy</Link>.</p>
              </div>
            </div>
          </div>
         
        </form>
        
        <div className={styles['signup-new__form-footer']}>
          <p className={`text-center`}>
            <Link to={'#'} onClick={onLogin}>
              Already a member? <span className={`text-underline`}>Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export const validate = (values: ISignUpFormValues) => {
  const errors: ISignUpFormValues = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    join: undefined,
  }

  // First Name validations
  if (values.firstName && values.firstName.length === 1 && values.firstName.length < 3) {
    // Avoid error to kick in if value length is 0 (For :focus purposes)
    errors.firstName = 'Enter your First Name'
  } else if (values.firstName && values.firstName.length < 3) {
    errors.firstName = 'First Name must have at least 3 characters'
  } else if (values.firstName && values.firstName.length > 50) {
    errors.firstName = 'First Name must have less than 50 characters'
  }

  // Last Name validations
  if (values.lastName && values.lastName.length === 1 && values.lastName.length < 3) {
    // Avoid error to kick in if value length is 0 (For :focus purposes)
    errors.lastName = 'Enter your Last Name'
  } else if (values.lastName && values.lastName.length < 3) {
    errors.lastName = 'Last Name must have at least 3 characters'
  } else if (values.lastName && values.lastName.length > 50) {
    errors.lastName = 'Last Name must have less than 50 characters'
  }

  // Email validations
  if (!values.email) {
    errors.email = 'Enter your email'
  } else if (!regexEmail.test(values.email)) {
    errors.email = 'Enter a valid email'
  }

  // Password validations
  if (!values.password) {
    errors.password = 'Enter your password'
  } else if (values.password && values.password.length < 8) {
    errors.password = 'Password must have at least 8 characters'
  } else if (!regexStrongPassword.test(values.password)) {
    errors.password = 'Password must inlude a letter, a number and a special character'
  } else if (values.password && values.password.length > 128) {
    errors.password = 'Password must have less than 128 characters'
  }

  return errors
}

export default SignUp
