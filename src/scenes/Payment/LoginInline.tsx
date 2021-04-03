import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, useField } from 'react-final-form-hooks'

import { RootState } from '../../services/RootState'

import { regexEmail, regexStrongPassword } from '../../utils/utils'
import { tokenRequestedEvent } from '../../services/userSecurity/token/events'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { selectSignInError, selectSignInIsSubmitting } from '../../services/userSecurity/token/selectors'

export interface ILoginInlineProps {
  styles: any,
  handleShowSignupPanelCallback(e: any): void
}

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
    errors.password = 'Hint: password must inlude an upper and lower case letter, a number and a special character'
  } else if (values.password && values.password.length > 128) {
    errors.password = 'Hint: password must be less than 128 characters'
  }

  return errors
}
const LoginInline: React.FC<ILoginInlineProps> = (props) => {
  const dispatch = useDispatch()

  const errorText = useSelector<RootState, string>(state => selectSignInError(state.userSecurity.token))
  const isSubmitting = useSelector<RootState, boolean>(state => selectSignInIsSubmitting(state.userSecurity.token))

  // Submit form
  const onSubmit = async (payload: any) => {
    dispatch(tokenRequestedEvent({ username: payload.email, password: payload.password, redirectTo: undefined /* todo: react router path */ }))
  }

  const { styles, handleShowSignupPanelCallback } = props


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
  //   (window as any).location.href=getAuth0Redirect(SocialProvider.Google);
  // }

  // const loginWithFacebook = () => {
  //   (window as any).location.href=getAuth0Redirect(SocialProvider.Facebook);
  // }

  return (<div className={styles['payment__item']} style={{ maxWidth: '400px', marginLeft: '20px', marginBottom: '10px', marginTop: '10px', height: 'auto' }}>
    <p className={styles['payment__login-signup']}>
      Not yet A MEMBER? <a href="/#" onClick={handleShowSignupPanelCallback}>Sign up</a>
    </p>
    <div className={styles['payment__intro']}>
      <p>
        To watch this content you’ll need an account. Please log in below.
    </p>
    </div>
    {/* <p>
      <Button variant="facebook" onClick={() => loginWithFacebook()}>
        <LazyImage src={FacebookLogo} alt="Log in with Facebook" /> Log in with Facebook
      </Button>
    </p>
    <p>
      <Button variant="google" onClick={() => loginWithGoogle()}>
        <LazyImage src={GoogleLogo} alt="Log in with Google" /> Log in with Google
      </Button>
    </p>
    <div className={styles['divider-word']}>
      <span>OR</span>
    </div> */}
    <div className={styles['payment__form']}>
      <p>
        <label>Email</label>
        <Input data={email} label="email" type="email" required />
      </p>
      <p>
        <label>Password</label>
        <Input data={password} label="password" type="password" required />
      </p>
      <p>
        <Button variant="secondary" color="success" label="Log in" size="full" onClick={() => handleSubmit()} isLoading={isSubmitting} />
        {
          errorText && errorText.length > 0 &&
          <span>
            {errorText.toLowerCase() === 'invalid_grant' ? 'Incorrect username or password, please try again.' : errorText}
          </span>
        }
      </p>
    </div>
  </div>)
}


export default LoginInline
