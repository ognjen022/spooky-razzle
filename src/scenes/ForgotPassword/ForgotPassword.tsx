import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, useField } from 'react-final-form-hooks'
import { push } from 'connected-react-router'

import styles from '../SignUp/SignUp.module.scss'

import LayoutDefault from '../../layouts/LayoutDefault/LayoutDefault'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { RootState } from '../../services/RootState'

import { regexEmail } from '../../utils/utils'
import { tokenPasswordResetRequestedEvent } from '../../services/userSecurity/token/events'
import { selectForgotPasswordError, selectForgotPasswordIsSubmitting } from '../../services/userSecurity/token/selectors'
import { accountToggleForgotPasswordEvent } from '../../services/userSecurity/accountDetails/events'


interface IForgotPasswordFormValues {
  email: string | undefined
}

export const validate = (values: IForgotPasswordFormValues) => {
  const errors: IForgotPasswordFormValues = {
    email: undefined
  }

  // Email validations
  if (!values.email) {
    errors.email = 'Enter your email'
  } else if (!regexEmail.test(values.email)) {
    errors.email = 'Enter a valid email'
  }

  return errors
}


const ForgotPassword = () => {
  let dispatch = useDispatch()

  let errorText = useSelector<RootState, string>(state => selectForgotPasswordError(state.userSecurity.token))
  let isSubmitting = useSelector<RootState, boolean>(state => selectForgotPasswordIsSubmitting(state.userSecurity.token))
  let [submitted, setSubmitted] = useState(false)

  // Submit form
  const onSubmit = async (payload: any) => {
    dispatch(tokenPasswordResetRequestedEvent({ email: payload.email }))
    setSubmitted(true)
  }

  // Initial values form
  const initialValues: Partial<IForgotPasswordFormValues> = {
    email: undefined
  }

  // Create form
  const { form, handleSubmit, dirtyFieldsSinceLastSubmit } = useForm({ onSubmit, validate, initialValues })

  // Create form fields
  const email = useField('email', form)

  useEffect(() => {
    // setSubmitted(false)
  }, [dirtyFieldsSinceLastSubmit])

  return (
    <div className={styles['signup-new']} onMouseDown={e => e.stopPropagation()}>
            
      <div className={styles['signup-new__content']}>
        <div className={styles['signup-new__form-header']}>
          <h2>Forgotten Password</h2>
        </div>
        
        <form className={styles['signup-new__form-container']} onSubmit={handleSubmit}>
          <div className={styles['signup-new__form']}>
            <p >
              <Input placeholder={'Email address'} data={email} aria-label="Email address" label="email" type="email" required />
            </p>
           
            <div className={styles['signup-new__action']}>
              <p>
                Still having trouble? <Link to={'/contact'} onClick={() => dispatch(accountToggleForgotPasswordEvent())}>Contact us</Link>
              </p>
              <div className={styles['signup-new__action']}>
                <p>
                  <Button
                  variant={'secondary'}
                    color={!submitted ? "success" : "ghost-green"}
                    label={!submitted ? "Send Reset Link" : "Link Sent. Re Send?"}

                    type="submit"
                    isLoading={isSubmitting} />
                  {
                    errorText && errorText.length > 0 && errorText !== 'Email sent.' &&
                    <span>{errorText}</span>
                  }
                </p>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
   
  )
}

export default ForgotPassword
