import React, { useState, useEffect } from 'react'
import { useForm, useField } from 'react-final-form-hooks'
import { useDispatch, useSelector } from 'react-redux'

import styles from './ResetPasswordForm.module.scss'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import { regexStrongPassword } from '../../utils/utils'
import { passwordUpdateRequestedEvent } from '../../services/userSecurity/password/events'
import { RootState } from '../../services/RootState'
import { selectError, selectIsSubmitting } from '../../services/userSecurity/password/selectors'

export interface IResetPasswordFormValues {
  password: string | undefined
  confirmPassword: string | undefined
}

const ResetPassword = () => {
  let dispatch = useDispatch()

  const [changeButton, setChangeButton] = useState(false)

  let errorText = useSelector<RootState, string>(state => selectError(state.userSecurity.password))
  let isSubmitting = useSelector<RootState, boolean>(state => selectIsSubmitting(state.userSecurity.password))


  // Submit form
  const onSubmit = async (payload: any) => {
    await dispatch(passwordUpdateRequestedEvent(payload.password, payload.confirmPassword))
    setChangeButton(true);
  }

  // Initial values form
  const initialValues: Partial<IResetPasswordFormValues> = {

  }

  // Create form
  const { form, handleSubmit, dirtySinceLastSubmit } = useForm({ onSubmit, validate, initialValues })

  // Create form fields
  const password = useField('password', form)
  const confirmPassword = useField('confirmPassword', form)


  return (
    <form onSubmit={handleSubmit}>
      <div className={styles['account__form']}>
        <div className={styles['account__form-group']}>
          <p>
            <label htmlFor="">New Password</label>
            <Input data={password} label="password" type="password" required />
          </p>
        </div>
        <div className={styles['account__form-group']}>
          <p>
            <label htmlFor="">Confirm new Password</label>
            <Input data={confirmPassword} label="confirmPassword" type="password" required />
          </p>
        </div>
        <div className={styles['account__form-group-button']}>
          <p className={`text-right ${styles['text-right']}`}>
            <Button
              type="submit"
              variant={"secondary"}
              color={changeButton && !isSubmitting && !errorText && !dirtySinceLastSubmit ? 'ghost' : 'success'}
              label={changeButton && !isSubmitting && !errorText && !dirtySinceLastSubmit ? 'Saved' : 'Save'}
              isLoading={isSubmitting}
            />
            {errorText !== undefined && errorText.length > 0 &&
              <span>{errorText}</span>
            }
          </p>
        </div>
      </div>
    </form>
  )
}

export const validate = (values: IResetPasswordFormValues) => {
  const errors: IResetPasswordFormValues = {
    password: undefined,
    confirmPassword: undefined
  }

  // Password validations
  if (!values.password) {
    errors.password = 'Enter your password'
  } else if (values.password && values.password.length < 8) {
    errors.password = 'Password must have at least 8 characters'
  } else if (!regexStrongPassword.test(values.password)) {
    errors.password = 'Password must inlude an upper and lower case letter, a number and a special character'
  } else if (values.password && values.password.length > 128) {
    errors.password = 'Password must have less than 128 characters'
  }

  // Confirm Password validations
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

export default ResetPassword
