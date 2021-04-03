import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, useField } from 'react-final-form-hooks'

import styles from '../SignUp/SignUp.module.scss'

import { RootState } from '../../services/RootState'

import { regexEmail, regexStrongPassword } from '../../utils/utils'
import { tokenRequestedEvent } from '../../services/userSecurity/token/events'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { selectSignInError, selectSignInIsSubmitting } from '../../services/userSecurity/token/selectors'
import { accountToggleForgotPasswordEvent, accountToggleLoginEvent, accountToggleSignupEvent } from '../../services/userSecurity/accountDetails/events'

interface ILoginFormValues {
  email: string | undefined
  password: string | undefined
}

export const validate = (values: ILoginFormValues) => {
  const errors: ILoginFormValues = {
    email: undefined,
    password: undefined
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
    errors.password = 'Hint: password must be at least 8 characters'
  } else if (!regexStrongPassword.test(values.password)) {
    errors.password = 'Hint: password must inlude a letter, a number and a special character'
  } else if (values.password && values.password.length > 128) {
    errors.password = 'Hint: password must be less than 128 characters'
  }

  return errors
}

const Login = () => {
  let dispatch = useDispatch()

  let errorText = useSelector<RootState, string>(state => selectSignInError(state.userSecurity.token))
  let isSubmitting = useSelector<RootState, boolean>(state => selectSignInIsSubmitting(state.userSecurity.token))
  let userId = useSelector<RootState, string | null>(state => state.userSecurity.profile.id);

  const showLoginModal  = useSelector<RootState, boolean>(state => state.userSecurity.accountDetails.showLogin);
  // Submit form
  const onSubmit = async (payload: any) => {
    await dispatch(tokenRequestedEvent({ username: payload.email, password: payload.password, redirectTo: undefined }));
  }

  const onForgotPassword = () => {
    dispatch(accountToggleForgotPasswordEvent());
    dispatch(accountToggleLoginEvent())
  }
  const onSignup = () => {
    dispatch(accountToggleSignupEvent())
    dispatch(accountToggleLoginEvent())
  }

  // Initial values form
  const initialValues: Partial<ILoginFormValues> = {
    email: undefined,
    password: undefined
  }

  // Create form
  const { form, handleSubmit } = useForm({ onSubmit, validate, initialValues })

  // Create form fields
  const email = useField('email', form)
  const password = useField('password', form)

  // const loginWithGoogle = () => {
  //   (window as any).location.href = getAuth0Redirect(SocialProvider.Google);
  // }

  // const loginWithFacebook = () => {
  //   (window as any).location.href = getAuth0Redirect(SocialProvider.Facebook);
  // }

  useEffect(() => {
    if (!showLoginModal) {
      form.reset({
        email: undefined,
        password : undefined
      })
      form.resetFieldState('email');
      form.resetFieldState('password');
    }
  }, [
    showLoginModal
  ])
  return (
    <div className={styles['signup-new']} onMouseDown={e => e.stopPropagation()}>
            
      <div className={styles['signup-new__content']}>
        <div className={styles['signup-new__form-header']}>
          <h2>Log In</h2>
        </div>
        
        <form className={styles['signup-new__form-container']} onSubmit={handleSubmit}>
          <div className={styles['signup-new__form']}>
            <p className={errorText && errorText.length > 0 ? styles['signup-new__form-invalid-input'] : ''}>
              <Input data={email} placeholder="Email" aria-label="Email" label="email" type="email" required />
            </p>
            <p className={errorText && errorText.length > 0 ? styles['signup-new__form-invalid-input'] : ''}>
              <Input data={password} label="password" placeholder="Password" aria-label="Password" type="password" required />
            </p>
            <div className={styles['signup-new__action']}>
              <p>
                {
                  errorText && errorText.length > 0 &&
                  <span role="alert">
                    {errorText.toLowerCase() === 'invalid_grant' ? 'Incorrect username or password, please try again.' : errorText}
                  </span>
                }
              </p>
              <p className={`text-right`}>
                <Link to={'#'} onClick={onForgotPassword}>Forgot password?</Link>
              </p>
              <p>
                <Button variant="secondary" color="success" type="submit" isLoading={isSubmitting}>
                  Log In
                </Button>
              </p>	
              <div className={styles['signup-new__tos-links']}>
              	<p>By creating an account, you are agreeing to our <Link to="/terms-of-service">Terms</Link> and <Link to="/privacy-policy">Privacy Policy</Link>.</p>
              </div>
            </div>
          </div>
        </form>

        <div className={styles['signup-new__form-footer']}>
          <p className={`text-center`}>
            <Link to={'#'} onClick={onSignup}>
              Not yet a member? <span className={`text-underline`}>Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
