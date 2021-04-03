import React, { useState } from 'react'
import { useForm, useField } from 'react-final-form-hooks'
import { useDispatch, useSelector } from 'react-redux'

import styles from './AccountDetailsForm.module.scss'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import { accountDetailsRequestedEvent } from '../../services/userSecurity/accountDetails/events'
import { regexEmail } from '../../utils/utils'
import { RootState } from '../../services/RootState'
import { selectFirstName, selectLastName } from '../../services/userSecurity/profile/selectors'

export interface IAccountDetailsFormValues {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  phone: string | undefined
}

const AccountDetails = () => {
  let dispatch = useDispatch()

  let profile = useSelector<RootState, any>((state) => state.userSecurity.profile)

  const [changeButton, setChangeButton] = useState(false)

  // Submit form
  const onSubmit = async (payload: any) => {
    // console.log({ firstName: payload.firstName, lastName: payload.lastName, email: payload.email, phone: payload.phone })
    await dispatch(accountDetailsRequestedEvent(payload.firstName, payload.lastName, payload.email, payload.phone))
    setChangeButton(true)
    setTimeout(() => {
      setChangeButton(false);
    }, 3000)
  }

  // Initial values form
  const initialValues: Partial<IAccountDetailsFormValues> = {
    firstName: selectFirstName(profile),
    lastName: selectLastName(profile),
    email: profile.email || '',
    phone: profile.phone || ''
  }

  // Create form
  const { form, handleSubmit } = useForm({ onSubmit, validate, initialValues })

  // Create form fields
  const firstName = useField('firstName', form)
  const lastName = useField('lastName', form)
  const email = useField('email', form)
  const phone = useField('phone', form)
  // const chatName = useField('chatname', form)

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles['account__form']}>
        <div className={styles['account__form-group']}>
          <p>
            <label>First Name</label>
            <Input data={firstName} label="firstName" type="text" required />
          </p>
        </div>
        <div className={styles['account__form-group']}>
          <p>
            <label>Last Name</label>
            <Input data={lastName} label="lastName" type="text" required />
          </p>
        </div>
        <div className={styles['account__form-group']}>
          <p>
            <label>Email Address</label>
            <Input data={email} label="email" type="text" required disabled />
          </p>
        </div>
        <div className={styles['account__form-group']}>
          <p>
            <label>Phone Number</label>
            <Input data={phone} label="phone" type="number" required />
          </p>
        </div>
        <div className={styles['account__form-group-button']}>
          <p className={`text-right ${styles['text-right']}`}>
            <Button
              type="submit"
              variant={changeButton ? 'secondary' : 'secondary'}
              color={changeButton ? 'ghost-green' : 'success'}
              label={changeButton ? 'Saved' : 'Save'}
            />
          </p>
        </div>
      </div>
    </form>
  )
}

export const validate = (values: IAccountDetailsFormValues) => {
  const errors: IAccountDetailsFormValues = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phone: undefined
  }
  // First Name validations
  if (values.firstName && values.firstName?.length === 1 && values.firstName?.length < 3) {
    // Avoid error to kick in if value length is 0 (For :focus purposes)
    errors.firstName = 'Enter your First Name'
  } else if (values.firstName && values.firstName?.length < 3) {
    errors.firstName = 'First Name must have at least 3 characters'
  } else if (values.firstName && values.firstName?.length > 50) {
    errors.firstName = 'First Name must have less than 50 characters'
  }

  // Last Name validations
  if (values.lastName && values.lastName?.length === 1 && values.lastName?.length < 3) {
    // Avoid error to kick in if value length is 0 (For :focus purposes)
    errors.firstName = 'Enter your Last Name'
  } else if (values.lastName && values.lastName?.length < 3) {
    errors.firstName = 'Last Name must have at least 3 characters'
  } else if (values.lastName && values.lastName?.length > 50) {
    errors.firstName = 'Last Name must have less than 50 characters'
  }

  // Email validations
  if (!values.email) {
    errors.email = 'Enter your email'
  } else if (!regexEmail.test(values.email)) {
    errors.email = 'Enter a valid email'
  }

  // Phone validations
  // if (!values.phone) {
  //   errors.phone = 'Enter your phone'
  // } else if (!regexEmail.test(values.email)) {
  //   errors.email = 'Enter a valid email'
  // }

  return errors
}

export default AccountDetails
