import React, { useEffect, useState } from 'react'
import { useForm, useField } from 'react-final-form-hooks'
import { StripeCardElementOptions } from '@stripe/stripe-js'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import { v4 as uuidv4 } from 'uuid';

import * as eventTypes from '../../services/payments/paymentDetails/eventTypes'

import styles from './Payment.module.scss'

import LayoutDefault from '../../layouts/LayoutDefault/LayoutDefault'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../services/RootState'
import { selectInitials } from '../../services/userSecurity/profile/selectors'
import LoginInline from './LoginInline'
import SignupInline from './SignupInline'
import { purchaseTagRequestedEvent, purchaseWatchItAllRequestedEvent, showPurchaseModalToggledEvent, purchaseGamePassRequestedEvent } from '../../services/payments/purchase/events'
import { PurchaseOption } from '../../services/payments/purchase/models';
import { push } from 'connected-react-router';
import { selectGamePassPriceFormatted, selectWatchItAllPriceFormatted, selectSeasonPassPriceFormatted } from '../../services/payments/products/selectors'
import Glide from '@glidejs/glide'
import { isGamePass, isSeasonPass } from '../../services/payments/purchase/selectors';


interface IPaymentFormValues {
  promoCode: string | undefined
  cardName: string | undefined
  cardNumber: string | undefined
  ccv: string | undefined
  expiry: string | undefined
}

enum paymentPanel {
  Signup,
  Login,
  Payment
}

interface IPaymentProps {
  readonly tagInfo: any | undefined,
  readonly eventId: number | undefined,
  readonly isLoggedIn: boolean
}

const ELEMENT_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      fontFamily: 'Modern Era, sans-serif',
      fontSize: '15px',
      backgroundColor: 'transparent',
      color: '#F5F5F5',
      lineHeight: 'auto',
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

const Payment: React.FC<IPaymentProps> = (props) => {

  const dispatch = useDispatch()
  const isSubscribeNow = useSelector<RootState, boolean>(state => state.router?.location?.pathname === '/subscribe-now')
  const elements = useElements()
  const stripe = useStripe()
  const [nameOnCard] = useState('')
  const [postal] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [, setPaymentMethod] = useState(null)

  const handleSubmit2 = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    try {
      const token = await stripe.createToken(cardElement as any);
      dispatch({ type: [eventTypes.PAYMENTS_PAYMENT_DETAILS_RECEIVED], payload: token });
    } catch (error) {
      dispatch({ type: [eventTypes.PAYMENTS_PAYMENT_DETAILS_ERRORED], payload: error });
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement as any,
      billing_details: {
        name,
        address: {
          postal_code: postal,
        },
      },
    });

    if (payload.error) {
      console.log('Payment.tsx [error]', payload.error);
      setErrorMessage(payload.error.message as any);
      setPaymentMethod(null);
    } else {
      setPaymentMethod(payload.paymentMethod as any);

      switch (selectedPurchaseOption) {
        case PurchaseOption.WatchItAll:
          dispatch(purchaseWatchItAllRequestedEvent(promoCode.input.value, payload))
          break
        case PurchaseOption.SeasonPass:
          // console.log(payload);
          dispatch(purchaseTagRequestedEvent(payload))
          break
        case PurchaseOption.GamePass:
          dispatch(purchaseGamePassRequestedEvent(payload))
          break
      }
      setErrorMessage('');
    }

  };

  let paymentStyle = styles['payment']

  const glideInstanceId = "glide-id_" + uuidv4();
  const glideInstanceClassName = `.${glideInstanceId} .glide`

  let [paymentGlide, setPaymentGlide] = useState<any>(new Glide())

  useEffect(() => {

    if ((window as any).__NewGlide) {
      paymentGlide = (window as any).__NewGlide(glideInstanceClassName, {
        type: 'slider',
        hoverpause: true,
        perView: 4,
        bound: 4,
        gap: 20,
        breakpoints: {
          1025: {
            perView: 2,
            gap: 20
          },
          769: {
            perView: 1,
            gap: 20,
            peek: {
              before: 20,
              after: 20
            }
          }
        }
      })
      if (paymentGlide) {

        paymentGlide.on(['mount.after', 'run'], function () {
          const index = paymentGlide.index;
          //setCurrentStreamIndex(index);
          setPaymentGlide(paymentGlide);
        });
        paymentGlide.mount()

      }
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  // let dispatch = useDispatch()

  // Submit form
  const onSubmit = async (payload: any) => {

    console.log('Payment.tsx onSubmit payload', payload)

    //   dispatch(signupRequestedEvent(payload.promoCode, payload.cardName, payload.cardNumber, payload.ccv, payload.expiry))
    //   dispatch(push('/'))
  }

  // Initial values form
  const initialValues: Partial<IPaymentFormValues> = {
    promoCode: undefined,
    cardName: undefined,
    cardNumber: undefined,
    ccv: undefined,
    expiry: undefined
  }

  // Create form
  const { form /*, handleSubmit, submitting */ } = useForm({ onSubmit, validate, initialValues })

  // Create form fields
  const promoCode = useField('promoCode', form)
  const isLoggedIn = props.isLoggedIn//useSelector<RootState, boolean>((state) => selectIsLoggedIn(state.userSecurity.token))

  const [selectedPaymentPanel, setSelectedPaymentPanel] = useState(isLoggedIn ? paymentPanel.Payment : paymentPanel.Signup)
  const [selectedPurchaseOption, setSelectedPurchaseOption] = useState<PurchaseOption | undefined>(undefined)//PurchaseOption.WatchItAll)


  const isSaving = useSelector<RootState, boolean>((state) => state.payments.purchase.isSaving)
  const routePathname = useSelector<RootState, string | undefined>(state => state.router?.location?.pathname)
  let initials = useSelector<RootState, string>((state) => selectInitials(state.userSecurity.profile))
  const name = useSelector<RootState, string>(state => state.userSecurity?.profile?.name || '')
  const gamePassPriceFormatted = useSelector<RootState, string>(state => selectGamePassPriceFormatted(state.payments?.products, state.configuration))
  const watchItAllPriceFormatted = useSelector<RootState, string>(state => selectWatchItAllPriceFormatted(state.payments?.products, state.configuration))
  const seasonPassPriceFormatted = useSelector<RootState, string>(state => selectSeasonPassPriceFormatted(state))

  const gamePassSelected = useSelector<RootState, boolean>(state => isGamePass(state.payments.purchase))
  const seasonPassSelected = useSelector<RootState, boolean>(state => isSeasonPass(state.payments.purchase))
  useEffect(() => {
    const width = window.innerWidth;
    const breakpoint = 768;
    if (width <= breakpoint) {
      // paymentGlide.go("=2")
    }
  }, [])

  useEffect(() => {
    if (paymentGlide?.index > 0 && selectedPurchaseOption !== undefined) {
      console.log('paymentGlide index', paymentGlide?.index)
      paymentGlide.go(`=0`)
    }

  }, [selectedPurchaseOption])

  if (isLoggedIn && selectedPaymentPanel === paymentPanel.Login) {
    setSelectedPaymentPanel(paymentPanel.Payment)
  } else if (!isLoggedIn && selectedPaymentPanel === paymentPanel.Payment) {
    setSelectedPaymentPanel(paymentPanel.Login)
  }

  // useEffect(() => {
  //   if (isLoggedIn && selectedPaymentPanel === paymentPanel.Login) {
  //     setSelectedPaymentPanel(paymentPanel.Payment)
  //   } else if (!isLoggedIn && selectedPaymentPanel === paymentPanel.Payment) {
  //     setSelectedPaymentPanel(paymentPanel.Login)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoggedIn])

  const renderSelectedPanel = () => {
    switch (selectedPaymentPanel) {
      case paymentPanel.Login:
        return renderLoginPanel()
      case paymentPanel.Signup:
        return renderSignupPanel()
      case paymentPanel.Payment:
        return renderStripePaymentPanel()
    }
  }

  const renderSelectedPrice = () => {
    switch (selectedPurchaseOption) {
      case PurchaseOption.SeasonPass:
        return (<span>{seasonPassPriceFormatted}</span>)
      case PurchaseOption.WatchItAll:
        return (<span>{watchItAllPriceFormatted} Billed Monthly</span>)
      case PurchaseOption.GamePass:
        return (<span>{gamePassPriceFormatted}</span>)
    }
  }

  const handleChangePanel = (newPanel: paymentPanel) => (e: any) => {
    if (e && e.preventDefault) e.preventDefault()

    setSelectedPaymentPanel(newPanel)
  }

  const handlePurchaseOptionChanged = (newPurchaseOption: PurchaseOption) => {

    if (newPurchaseOption !== PurchaseOption.WatchItAll) {
      form.reset()
    }
    setSelectedPurchaseOption(newPurchaseOption)
  }


  const renderStripePaymentPanel = () => {
    return (
      <div className={styles['payment__item']}>
        <div className={styles['payment__profile']}>
          <div className={styles['profile-badge']}>
            <span className={styles['profile-badge__initials']}>
              {initials}
            </span>
          </div>
          <div className={styles['payment__profile-name']}>
            {name}
          </div>
        </div>

        <div className={styles['payment__intro']}>
          <p>Good for the game. </p>
          <p className="hide-medium">To watch premium content select a pass on the right before making your purchase below.</p>
          <p className="show-medium">To watch premium content select a pass by swiping right before making your purchase below.</p>
        </div>
        <p className={styles['payment__total']}>
          <span>Total:</span>
          {
            renderSelectedPrice()
          }

        </p>
        <form onSubmit={handleSubmit2} className={styles['payment__form']}>
          {selectedPurchaseOption === PurchaseOption.WatchItAll &&
            <p>
              <label>Promo Code</label>
              <Input data={promoCode} label="promoCode" type="text" />
            </p>
          }
          {selectedPurchaseOption !== PurchaseOption.WatchItAll &&
            <p>
              <label>Promo Code</label>
              <Input placeholder="Select a valid pass" disabled={true} label="promoCode" type="text" />
            </p>
          }
          <p>
            <label>Name on Card</label>
            <Input data={nameOnCard} label="cardName" type="text" required />
          </p>

          {
            <div className={styles['payment__form-group']}>
              <div className="p">
                <label htmlFor="cardNumber">Card Number</label>
                <CardNumberElement
                  id="cardNumber"
                  className={styles['payment__input']}
                  /*onBlur={() => console.log('CardCvcElement blur')}
                  onChange={() => console.log('CardCvcElement change')}
                  onFocus={() => console.log('CardCvcElement focus')}
                  onReady={() => console.log('CardCvcElement ready')}*/
                  options={ELEMENT_OPTIONS}
                />
              </div>
              <div className="p">
                <label htmlFor="expiry">Expiry</label>
                <CardExpiryElement
                  id="expiry"
                  className={styles['payment__input']}
                  /*onBlur={() => console.log('CardExpiryElement blur')}
                  onChange={() => console.log('CardExpiryElement change')}
                  onFocus={() => console.log('CardExpiryElement focus')}
                  onReady={() => console.log('CardExpiryElement ready')}*/
                  options={ELEMENT_OPTIONS}
                />
              </div>
              <div className="p">
                <label htmlFor="cvc">CCV</label>
                <CardCvcElement
                  id="cvc"
                  className={styles['payment__input']}
                  /*onBlur={() => console.log('CardCvcElement blur')}
                  onChange={() => console.log('CardCvcElement change')}
                  onFocus={() => console.log('CardCvcElement focus')}
                  onReady={() => console.log('CardCvcElement ready')}*/
                  options={ELEMENT_OPTIONS}
                />
              </div>
            </div>
          }
          <p>
            <small>Purchases are secured by Stripe</small>
          </p>
          <p>
            <Button type="submit" color="success" label="Purchase" isLoading={isSaving} disabled={selectedPurchaseOption === undefined} />
          </p>
          {
            errorMessage && errorMessage?.length > 0 &&
            <span className={styles['payment__form__error-text']}>
              {errorMessage}
            </span>
          }
        </form>
      </div>
    )
  }

  const renderSignupPanel = () => {
    return (
      <SignupInline styles={styles} handleShowLoginPanelCallback={handleChangePanel(paymentPanel.Login)}></SignupInline>
    )
  }

  const renderLoginPanel = () => {
    return <LoginInline styles={styles} handleShowSignupPanelCallback={handleChangePanel(paymentPanel.Signup)}   ></LoginInline>
  }

  const browseClicked = () => {

    if (routePathname !== '/subscribe-now') {
      dispatch(showPurchaseModalToggledEvent(undefined, undefined, undefined))
    }
    dispatch(push('/browse'))
  }

  const renderGamePassPanel = () => {
    return (
      <div className={`${styles['payment__item']} ${selectedPurchaseOption === PurchaseOption.GamePass ? styles['is-selected'] : ''}`}>
        <h2 className={styles['payment__header']}>Game Pass</h2>
        <div className={styles['payment__price-group']}>
          {
            routePathname !== 'subscribe-now' && gamePassSelected &&
            <>
              <div className={styles['payment__price']}>
                {gamePassPriceFormatted}
              </div>
              <div className={styles['payment__price-label']}>
                Single Game Pass
              </div>
            </>
          }
          {
            !gamePassSelected &&
            <p>Purchase individual games from your club, school, or team - with live and on demand access to the purchased game.</p>
          }
        </div>
        <ul className={styles['payment__feature-list']}>
          {[
            'Watch a game live',
            'Watch on demand as many times as you like'
          ].map((text, index) =>
            <li className={styles['payment__feature-list-item']} key={index}>
              <svg className={styles['icon']} role="presentation">
                <use xlinkHref="#icon-purchased"></use>
              </svg>
              <span>{text}</span>
            </li>
          )}
        </ul>
        <div className={styles['payment__button']}>
          {
            selectedPurchaseOption === PurchaseOption.GamePass && props.eventId !== undefined &&
            <Button label="Selected" />
          }
          {
            selectedPurchaseOption !== PurchaseOption.GamePass && props.eventId === undefined &&
            <Button color="ghost-green" label="Browse Games" onClick={browseClicked} />
          }
          {
            selectedPurchaseOption !== PurchaseOption.GamePass && props.eventId !== undefined &&
            <Button color="ghost" label={'select'} onClick={() => handlePurchaseOptionChanged(PurchaseOption.GamePass)} />
          }
        </div>
      </div>
    )
  }

  const renderWatchItAllPanel = () => {
    return (
      <div className={`${styles['payment__item']} ${selectedPurchaseOption === PurchaseOption.WatchItAll ? styles['is-selected'] : ''}`}>
        <h2 className={styles['payment__header']}>Watch it All</h2>
        <div className={styles['payment__price-group']}>
          <div className={styles['payment__price']}>
            {watchItAllPriceFormatted}
          </div>
          <div className={styles['payment__price-label']}>Monthly subscription</div>
        </div>
        <ul className={styles['payment__feature-list']}>
          {[
            'Get your first month free',
            'Watch all games live',
            'Includes all competitions',
            'No fixed-term contracts',
            'Watch on demand as many times as you like',
            'Watch on desktop or mobile devices'
          ].map((text, index) =>
            <li className={styles['payment__feature-list-item']} key={index}>
              <svg className={styles.icon} role="presentation">
                <use xlinkHref="#icon-purchased"></use>
              </svg>
              <span>{text}</span>
            </li>
          )}
        </ul>
        <div className={styles['payment__button']}>
          {
            selectedPurchaseOption === PurchaseOption.WatchItAll &&
            <Button label="Selected" />
          }
          {
            selectedPurchaseOption !== PurchaseOption.WatchItAll &&
            <Button color="ghost" label="Select" onClick={() => handlePurchaseOptionChanged(PurchaseOption.WatchItAll)} />
          }
        </div>
      </div>
    )
  }

  const renderSeasonPassPanel = () => {
    return (
      <div className={`${styles['payment__item']}  ${selectedPurchaseOption === PurchaseOption.SeasonPass ? styles['is-selected'] : ''}`}>
        <h2 className={styles['payment__header']}>Season Pass</h2>

        <div className={styles['payment__price-group']}>

          {routePathname !== 'subscribe-now' && seasonPassSelected &&
            <>
              <div className={styles['payment__price']}>
                {seasonPassPriceFormatted}
              </div>
              <div className={styles['payment__price-label']}>
                Per Competition
              </div>
            </>
          }
          {routePathname !== 'subscribe-now' && !seasonPassSelected &&

            <p>Purchase a Season Pass and follow your club, school, or team - with live and on demand access to all their competition games throughout the season.</p>

          }
        </div>




        <ul className={styles['payment__feature-list']}>
          {[
            'Watch any game live from the selected competition',
            'Watch on demand as many times as you like',
            'Watch on desktop or mobile devices'
          ].map((text, index) =>
            <li className={styles['payment__feature-list-item']} key={index}>
              <svg className={styles.icon} role="presentation">
                <use xlinkHref="#icon-purchased"></use>
              </svg>
              <span>{text}</span>
            </li>
          )}
        </ul>
        <div className={styles['payment__button']}>
          {
            selectedPurchaseOption === PurchaseOption.SeasonPass && seasonPassPriceFormatted &&
            <Button label="Selected" />
          }
          {
            selectedPurchaseOption !== PurchaseOption.SeasonPass && !seasonPassPriceFormatted &&
            <Button color="ghost-green" label="Browse Games" onClick={browseClicked} />
          }
          {
            selectedPurchaseOption !== PurchaseOption.SeasonPass && seasonPassPriceFormatted &&
            <Button color="ghost" label={'select'} onClick={() => handlePurchaseOptionChanged(PurchaseOption.SeasonPass)} />
          }
        </div>
      </div>
    )
  }



  return (
    <LayoutDefault>
      <section>
        <div className={`container ${styles['container']}`}>
          <div className={`${paymentStyle} ${glideInstanceId}`}>
            <div className={`glide ${styles['glide']}`}>
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  <li className="glide__slide">
                    {
                      renderSelectedPanel()
                    }
                  </li>
                  <li className="glide__slide">
                    {
                      isSubscribeNow ? renderWatchItAllPanel() : renderGamePassPanel()
                    }
                  </li>

                  <li className="glide__slide">
                    {
                      isSubscribeNow ? renderGamePassPanel() : renderWatchItAllPanel()
                    }
                  </li>

                  <li className="glide__slide">
                    {
                      renderSeasonPassPanel()
                    }
                  </li>
                </ul>
              </div>

              <div data-glide-el="controls" className={`glide__arrows ${styles['glide__arrows']}`}>
                <button data-glide-dir="<" className={`glide__button-prev ${styles['glide__button-prev']}`}>
                  <svg className="icon" role="presentation">
                    <use xlinkHref="#icon-chevron-left"></use>
                  </svg>
                  <span className="screen-reader-text">Previous Slide</span>
                </button>
                <button data-glide-dir=">" className={`glide__button-next ${styles['glide__button-next']}`}>
                  <svg className="icon" role="presentation">
                    <use xlinkHref="#icon-chevron-right"></use>
                  </svg>
                  <span className="screen-reader-text">Next Slide</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </LayoutDefault>
  )
}


export const validate = (values: IPaymentFormValues) => {
  const errors: IPaymentFormValues = {
    promoCode: undefined,
    cardName: undefined,
    cardNumber: undefined,
    ccv: undefined,
    expiry: undefined
  }

  return errors
}

export default Payment
