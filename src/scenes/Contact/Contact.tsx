import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Contact.module.scss'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Textarea from '../../components/Textarea/Textarea'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../services/RootState'
import { selectContactUsIsSending, selectContactUsError } from '../../services/contact/selectors'
import { contactUsRequestedEvent } from '../../services/contact/events'
import { regexEmail } from '../../utils/utils'
import { useField, useForm } from 'react-final-form-hooks'

interface IContactValues {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  message: string | undefined
}

interface ContactProps {

}


export const validate = (values: IContactValues) => {
  const errors: IContactValues = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    message: undefined
  }

  // Email validations
  if (!values.email) {
    errors.email = 'Enter your email'
  } else if (!regexEmail.test(values.email)) {
    errors.email = 'Enter a valid email'
  }

  // Password validations
  if (!values.message) {
    errors.message = 'Enter your message'
  }
  return errors
}


const Contact = () => {

  let dispatch = useDispatch()

  let isSending = useSelector<RootState, boolean>(state => selectContactUsIsSending(state.contact))

  const onSubmit = async (payload: any) => {
    await dispatch(contactUsRequestedEvent(payload.firstName, payload.lastName, payload.email, payload.message));
    setTimeout(() => {
      form.reset();
      form.resetFieldState('firstName');
      form.resetFieldState('lastName');
      form.resetFieldState('email');
      form.resetFieldState('message');
    }, 500)
  }

  // Initial values form
  const initialValues: Partial<IContactValues> = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    message: undefined
  }

  // Create form
  const { form, handleSubmit } = useForm({ onSubmit, validate, initialValues })

  const firstName = useField('firstName', form)
  const lastName = useField('lastName', form)
  const email = useField('email', form)
  const message = useField('message', form)

  return (
    <div className={'container'}>

      <div className={styles['contact-container']}>
        <div className={styles['contact']}>
          <h1>Get in touch.</h1>
          <p>Send us an email at info@sideline.live, find us on <a className={styles['contact__link']} href="https://www.facebook.com/sidelinelivenz" target="_blank" rel="noopener">Facebook</a> and <a className={styles['contact__link']} href="https://www.instagram.com/sideline.live" target="_blank" rel="noopener">Instagram</a>, or send us a message using the form to the right.</p>
          <p>If you’re a school or a club, we’d especially love to hear from you! Send us a note and we’ll get in touch to let you know how we can work together.</p>
          <p>If you need help with anything on the site, click the little message icon at the bottom of the page to talk to our support team, or check out our frequently asked questions <Link className={styles['contact__link']} to={'/faq'}>here</Link>.</p>
          <p>We look forward to hearing from you.</p>
        </div>

        <form className={styles['contact-form']} onSubmit={handleSubmit} >
          <div className={styles['contact-form__input-column']}>
            <p>
              <label>First Name</label>
              <Input data={firstName} type="text" />
            </p>
            <p>
              <label>Last Name</label>
              <Input data={lastName} type="text" />
            </p>
            <p>
              <label>Email</label>
              <Input data={email} type="text" />
            </p>
          </div>

          <div className={styles['contact-form__message']}>
            <p>
              <label>Message</label>
              <Textarea data={message} cols={15} rows={15} />
            </p>
            <div className={styles['contact-form__button-container']}>
              <Button className={styles['contact-form__button']} type="submit" variant="secondary" isLoading={isSending} color="success" label="Send Message" />
            </div>
          </div>
        </form>
      </div>


    </div>
  )
}

export default withRouter(Contact)