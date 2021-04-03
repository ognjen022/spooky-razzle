import React, { useState, useEffect } from 'react'
import { useForm, useField } from 'react-final-form-hooks'
import { useDispatch, useSelector } from 'react-redux'

import styles from './PaymentDetailsForm.module.scss'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import { RootState } from '../../services/RootState'
import { selectError, selectIsSubmitting } from '../../services/payments/paymentDetails/selectors'
import { paymentDetailsRequestedEvent } from '../../services/payments/paymentDetails/events'
// import { isNumber } from '../../utils/utils'

export interface IPaymentDetailsFormValues {
  name: string | undefined
  card: string | undefined
  ccv: string | undefined
  expiryMonth: string | undefined
  expiryYear: string | undefined
  address1: string | undefined
  address2: string | undefined
  city: string | undefined
  postCode: string | undefined
  country: string | undefined
}

const PaymentDetails = () => {
  let dispatch = useDispatch()
  // const [changeButton, setChangeButton] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [submitted, setSubmitted] = useState(false)

  let errorText = useSelector<RootState, string>(state => selectError(state.payments.paymentDetails))
  let isSubmitting = useSelector<RootState, boolean>(state => selectIsSubmitting(state.payments.paymentDetails))


  let cardName = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.name || '')
  let cardAddressLine1 = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.address_line1 || '')
  let cardAddressLine2 = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.address_line2 || '')
  let cardAddressCity = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.address_city || '')
  let cardPostCode = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.address_zip || '')
  let cardAddressCountry = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.address_country || '')


  // Submit form
  const onSubmit = async (payload: any) => {
    await dispatch(paymentDetailsRequestedEvent(
      payload.name,
      cardNumber.replace(/  /g, ''), //payload.card,
      payload.ccv,
      payload.expiryMonth,
      payload.expiryYear,
      payload.address1,
      payload.address2,
      payload.city,
      payload.postCode,
      payload.country
    ))
    //setChangeButton(true)
    setSubmitted(true)
    // clear fields
    setTimeout(() => {
      //form.reset()
      //setCardNumber('')
      //setChangeButton(false)
    }, 2000)
  }

  // Initial values form
  let initialValues: Partial<IPaymentDetailsFormValues> = {
    name: cardName,
    address1: cardAddressLine1,
    address2: cardAddressLine2,
    city: cardAddressCity,
    postCode: cardPostCode,
    country: cardAddressCountry
  }

  // Create form
  const { form, handleSubmit, dirtySinceLastSubmit } = useForm({ onSubmit, validate, initialValues })

  useEffect(() => {
    setSubmitted(false)
  }, [dirtySinceLastSubmit])

  // Create form fields
  const name = useField('name', form)
  // const card = useField('card', form)
  const ccv = useField('ccv', form)
  const expiryMonth = useField('expiryMonth', form)
  const expiryYear = useField('expiryYear', form)
  const address1 = useField('address1', form)
  const address2 = useField('address2', form)
  const city = useField('city', form)
  const postcode = useField('postCode', form)
  const country = useField('country', form)

  const onCardNumberChange = (e) => {
    var value = e.target.value;
    const valArray = value.split(' ').join('').split('');
    var valSpace = value.split("")

    // to work with backspace
    if (valSpace[valSpace.length - 1] == ' ') {
      var valSpaceN = valSpace.slice(0, -2)
      value = valSpaceN.join("")
      setCardNumber(value)
      return;
    }

    if (isNaN(valArray.join('')))
      return;
    if (valArray.length === 17)
      return
    if (valArray.length % 4 === 0 && valArray.length <= 15) {
      setCardNumber(e.target.value + "  ")
    } else {
      setCardNumber(e.target.value)
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles['account__form']}>
        <div className={styles['account__form-group']}>
          <p>
            <label>Name on card</label>
            <Input data={name} label="name" type="text" required />
          </p>
          <p>
            <label>Card Number</label>
            {/* <Input data={card} label="card" type="text" required /> */}
            <input type="text" value={cardNumber} onChange={onCardNumberChange} required />
          </p>
          <div className={styles['account__form-group--inline']}>
            <p>
              <label>Expiry Month [1-12]</label>
              <Input
                data={expiryMonth}
                label="expiryMonth"
                type="text"
                maxLength={2}
                onInput={e => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                required
              />
            </p>

            <p>
              <label>Expiry Year [YYYY]</label>
              <Input
                data={expiryYear}
                label="expiryYear"
                type="text"
                maxLength={4}
                onInput={e => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                required
              />
            </p>
          </div>

          <p>
            <label>CCV</label>
            <Input data={ccv} label="ccv" type="text" required />
          </p>
        </div>
        <div className={styles['account__form-group']}>
          <p>
            <label>Address Line 1</label>
            <Input data={address1} label="address1" type="text" required />
          </p>
          <p>
            <label>Address Line 2</label>
            <Input data={address2} label="address2" type="text" />
          </p>

          <p>
            <label>City</label>
            <Input data={city} label="city" type="text" required />
          </p>

          <div className={styles['account__form-group--inline']}>
            <p>
              <label>Postcode</label>
              <Input data={postcode} label="postcode" type="text" required />
            </p>

            <p>
              <label>Country</label>
              <Input data={country} label="country" type="text" required />
            </p>
          </div>

          <div className={styles['account__form-group-button']}>
            <p className={`text-right ${styles['text-right']}`}>
              <Button
                type="submit"
                variant={submitted && !isSubmitting && !errorText && !dirtySinceLastSubmit ? 'secondary' : 'secondary'}
                isLoading={isSubmitting}
                color={submitted && !isSubmitting && !errorText && !dirtySinceLastSubmit ? 'ghost-green' : 'success'}
                label={submitted && !isSubmitting && !errorText && !dirtySinceLastSubmit ? 'Saved' : 'Save'}
              />
            </p>
            <p className={styles['account__stripe-info']}>All payments Secured by Stripe</p>
            <p>
              {
                errorText && errorText.length > 0 &&
                <span>
                  {errorText}
                </span>
              }
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}

export const validate = (values: IPaymentDetailsFormValues) => {
  const errors: IPaymentDetailsFormValues = {
    name: undefined,
    card: undefined,
    ccv: undefined,
    expiryMonth: undefined,
    expiryYear: undefined,
    address1: undefined,
    address2: undefined,
    city: undefined,
    postCode: undefined,
    country: undefined
  }

  // Name validations
  if (values.name && values.name.length === 1 && values.name.length < 3) {
    // Avoid error to kick in if value length is 0 (For :focus purposes)
    errors.name = 'Enter your Name as it appears on your card'
  }

  // Card number validations
  if (values.address1 && values.address1.length === 1 && values.address1.length < 3) {
    // Avoid error to kick in if value length is 0 (For :focus purposes)
    errors.card = 'Enter your card number'
  }

  // Card CCV number validations
  // if (values.ccv && values.ccv.toString().length === 1 && values.ccv.toString().length < 3) {
  // 	// Avoid error to kick in if value length is 0 (For :focus purposes)
  // 	errors.ccv = 'Enter your card CCV number'
  // } else if (values.ccv && values.ccv.toString().length < 3) {
  // 	errors.ccv = 'CCV must have 3 characters'
  // } 

  // Address1 validations
  if (values.address1 && values.address1.length === 1 && values.address1.length < 3) {
    // Avoid error to kick in if value length is 0 (For :focus purposes)
    errors.address1 = 'Enter your Address'
  }

  // City validations
  if (values.city && values.city.length === 1 && values.city.length < 3) {
    // Avoid error to kick in if value length is 0 (For :focus purposes)
    errors.address1 = 'Enter your Address'
  }

  return errors
}

export default PaymentDetails
