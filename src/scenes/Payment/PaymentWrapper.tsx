// Because stripe Elements is a PIG

import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements
} from '@stripe/react-stripe-js'

import PaymentNew from './PaymentNew'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../services/userSecurity/token/selectors'
import { RootState } from '../../services/RootState'
import { IConfigurationState } from '../../services/config/models'

interface IPaymentWrapperProps {
  readonly tagInfo: any | undefined,
  readonly eventId: number | undefined
}
const PaymentWrapper: React.FC<IPaymentWrapperProps> = (props) => {

  const isLoggedIn = useSelector<RootState, boolean>((state) => selectIsLoggedIn(state.userSecurity.token))

  const configuration = useSelector<RootState, IConfigurationState>(state => state.configuration)
  const [stripePromise, setStripePromise] = useState(loadStripe(configuration?.stripe_key ?? '')) // todo:
  
  useEffect(() => {
    setStripePromise(loadStripe(configuration.stripe_key ?? ''));
  }, [configuration])
  useEffect(() => {
    console.log('PaymentWrapper isLoggedIn', isLoggedIn)
  }, [isLoggedIn])

  return (
    <div onMouseDown={e => e.stopPropagation()}>
      {
          configuration.stripe_key &&
        <Elements stripe={stripePromise}>
          <PaymentNew
            tagInfo={props.tagInfo}
            eventId={props.eventId}
            isLoggedIn={isLoggedIn}/>
          {/* <Payment tagInfo={props.tagInfo} eventId={props.eventId} isLoggedIn={isLoggedIn} ></Payment> */}
        </Elements>
      }
    </div>
  )
}

export default PaymentWrapper