import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, useField } from 'react-final-form-hooks'

//import GoogleLogo from '../../svg/images/google-logo.svg'
//import FacebookLogo from '../../svg/images/facebook-logo.svg'
import { RootState } from '../../services/RootState'

import { regexEmail, regexStrongPassword } from '../../utils/utils'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { selectIsSubmitting } from '../../services/userSecurity/signup/selectors'
import { signupRequestedEvent } from '../../services/userSecurity/signup/events'
import { Link } from 'react-router-dom'

export interface ISignupInlineProps {
  styles: any,
  handleShowLoginPanelCallback(e: any): void
}

export interface ISignUpFormValues {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  password: string | undefined
  join: boolean | undefined
}

const SignupInline: React.FC<ISignupInlineProps> = (props) => {
  let dispatch = useDispatch()
  const { styles, handleShowLoginPanelCallback } = props

  let isSubmitting = useSelector<RootState, boolean>(state => selectIsSubmitting(state.userSecurity.signup))
  let [isSubmittingInternalState, setIsSubmittingInternalState] = useState(false)

  // Submit form
  const onSubmit = async (payload: any) => {
    dispatch(signupRequestedEvent(payload.firstName, payload.lastName, payload.email, payload.password, payload.join))
    setIsSubmittingInternalState(true)
  }

  // hold on the panel until signup finished
  useEffect(() => {
    if (isSubmittingInternalState && !isSubmitting) {
      handleShowLoginPanelCallback(undefined)
    }
  }, [isSubmitting, isSubmittingInternalState])


  // Create form
  const { form, handleSubmit } = useForm({ onSubmit, validate })
  const [joinValue, setJoinValue] = useState(true);

  // Create form fields
  const firstName = useField('firstName', form)
  const lastName = useField('lastName', form)
  const email = useField('email', form)
  const password = useField('password', form)
  const join = useField('join', form)

  return (
    <div className={styles['payment__item']}>
      <p className={styles['payment__login-signup']}>
        Please sign up below or <a href="/#" onClick={handleShowLoginPanelCallback}><span className={styles['link']}>LOG IN</span></a>
      </p>
      <div className={styles['payment__intro']}>
        <p>Welcome to Sideline.Live<br /> To watch free or premium content you'll need an account.</p>
      </div>
      {/*<p>



 Log In 

        <Button variant="facebook">
          <LazyImage src={FacebookLogo} alt="Sign up with Facebook" /> Sign up with Facebook
	      </Button>
      </p>
      <p>
        <Button variant="google">
          <LazyImage src={GoogleLogo} alt="Sign up with Google" /> Sign up with Google
	      </Button>
      </p>
      <div className={styles['divider-word']}>
        <span>OR</span>
      </div>*/}
      <div className={styles['payment__form']}>
        <p>
          <label>First Name</label>
          <Input data={firstName} label="firstName" type="text" required />
        </p>
        <p>
          <label>Last Name</label>
          <Input data={lastName} label="lastName" type="text" required />
        </p>
        <p>
          <label>Email</label>
          <Input data={email} label="email" type="email" required />
        </p>
        <p>
          <label>Password</label>
          <Input data={password} label="password" type="password" required />
        </p>
        <p className={styles['payment__form-join']}>
          <input
            type="checkbox"
            id={join.input.name}
            value={`${joinValue}`}
            checked={joinValue}
            onChange={() => { }}
          />
          <label onClick={() => setJoinValue(!joinValue)}>
            Join our community<br />
            <small className='color-grey-lightest'>Send me newsletters and selected offers.</small>
          </label>
        </p>
        <p>
          <small>By creating an account, you are agreeing to our <Link to="/terms-of-service">Terms</Link> and <Link to="/privacy-policy">Privacy Policy</Link>.</small>
        </p>
        <p>
          <Button
            type="submit"
            variant="secondary"
            color="success"
            label="Sign Up"
            size="full"
            isLoading={isSubmitting}
            onClick={() => handleSubmit()}
          />
        </p>
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
    errors.password = 'Password must inlude an upper and lower case letter, a number and a special character'
  } else if (values.password && values.password.length > 128) {
    errors.password = 'Password must have less than 128 characters'
  }

  return errors
}


export default SignupInline
