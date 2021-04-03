import React, { useState, useEffect } from 'react'

import styles from './Account.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../services/RootState'

import LayoutDefault from '../../layouts/LayoutDefault/LayoutDefault'
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm'
import PaymentDetailsForm from '../../components/PaymentDetailsForm/PaymentDetailsForm'
import AccountDetailsForm from '../../components/AccountDetailsForm/AccountDetailsForm'
import SubscriptionsDetails from '../../components/SubscriptionsDetails/SubscriptionsDetails'
import { getSubscriptionDetails } from '../../services/payments/subscriptions/api/getSubscriptionsSubscriptionDetails'
import { subscriptionDetailsRequestedEvent } from '../../services/payments/subscriptions/events'
import { subscriptionDetailsReceivedEvent } from '../../services/payments/subscriptions/events'
import { subscriptionDetailsErroredEvent } from '../../services/payments/subscriptions/events'
import { selectInitials } from '../../services/userSecurity/profile/selectors'
import { useCardBrand, images } from 'react-card-brand'

interface IAccountProps {
  active?: boolean;
}

const Account: React.FC<IAccountProps> = () => {

  const dispatch = useDispatch();
  const { getSvgProps } = useCardBrand();
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);

  /* Moved to epic
  const getData = async () => {
    try {
      // dispatch(subscriptionDetailsRequestedEvent())
      const result = await getSubscriptionDetails()
      dispatch(subscriptionDetailsReceivedEvent(result))
    } catch (error) {
      dispatch(subscriptionDetailsErroredEvent(error))
    }
  }
  */

  let initials = useSelector<RootState, string>((state) => selectInitials(state.userSecurity.profile))
  let fullName = useSelector<RootState, string>((state) => state.userSecurity.profile?.name || '')
  let email = useSelector<RootState, string>((state) => state.userSecurity.profile?.email || '')
  let phone = useSelector<RootState, string>((state) => state.userSecurity.profile?.phone || '')

  let cardBrand = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.brand || '')
  let cardName = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.name || '')
  let cardLast4 = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.last4 || '')

  let cardAddressLine1 = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.address_line1 || '')
  let cardAddressLine2 = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.address_line2 || '')
  let cardAddressCity = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.address_city || '')
  let cardPostCode = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.address_zip || '')
  let cardAddressCountry = useSelector<RootState, string>(state => state.userSecurity.profile.cardInfo?.address_country || '')

  const [panelOne, setPanelOne] = useState(true);
  const [panelTwo, setPanelTwo] = useState(false);
  const [panelThree, setPanelThree] = useState(false);
  const [panelFour, setPanelFour] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);

  const handlePanelClick = (index: number) => {
    index === 1 ? setPanelOne(true) : setPanelOne(false)
    index === 2 ? setPanelTwo(true) : setPanelTwo(false)
    index === 3 ? setPanelThree(true) : setPanelThree(false)
    index === 4 ? setPanelFour(true) : setPanelFour(false)
  }

  const toggleAddPaymentForm = () => setShowAddPaymentForm(!showAddPaymentForm)

  return (
    <LayoutDefault>
      <section>
        <div className={`container ${styles['container']}`}>
          <div className={styles['account']}>

            <button className={`${styles['account__title']} ${panelOne ? styles['is-active'] : null}`} onClick={() => handlePanelClick(1)}>
              <span>Security</span>
              <i className={styles['account__title-arrow']}>
                <svg className="icon" role="presentation">
                  <use xlinkHref="#icon-chevron-down"></use>
                </svg>
              </i>
            </button>
            <div className={`${styles['account__content']} ${panelOne ? styles['is-active'] : null}`}>
              <div className={styles['account__content-inner']}>
                <div className={styles['account__name-container']}>
                  <div className={styles['profile-badge']}>
                    <span className={styles['profile-badge__initials']}>
                      {initials}
                    </span>
                  </div>
                  <h3 className={styles['account__name']}>{fullName}</h3>
                </div>
                <ResetPasswordForm />
              </div>
            </div>


            <button className={`${styles['account__title']} ${panelTwo ? styles['is-active'] : null}`} onClick={() => handlePanelClick(2)}>
              <span>Payment</span>
              <i className={styles['account__title-arrow']}>
                <svg className="icon" role="presentation">
                  <use xlinkHref="#icon-chevron-down"></use>
                </svg>
              </i>
            </button>
            <div className={`${styles['account__content']} ${panelTwo ? styles['is-active'] : null}`}>
              <div className={styles['account__content-inner']}>
                <div className={styles['account__name-container']}>
                  <div className={styles['profile-badge']}>
                    <span className={styles['profile-badge__initials']}>
                      {initials}
                    </span>
                  </div>
                  <h3 className={styles['account__name']}>{fullName}</h3>
                </div>

                <div className={styles['account-details']}>
                  {cardBrand && cardName && cardLast4 ? (
                    <>
                      <div className={styles['account-details__title']}>
                        <h3>Details</h3>
                      </div>
                      <div className={styles['account-details__content']}>
                        <p>
                          {cardName}
                          <br />
                          {`**** **** **** ${cardLast4} `}
                          <svg {...getSvgProps({ type: cardBrand.toLowerCase(), images })} />
                        </p>
                        <p>
                          {cardAddressLine1}
                          <br />
                          {cardAddressLine2}
                          <br />
                          {cardAddressCity}{cardAddressCountry ? `, ${cardAddressCountry} ${cardPostCode}`.trim() : ''}
                          <br />

                        </p>
                      </div>
                    </>
                  ) : 'No payment card associated to this account.'}
                  <button
                    onClick={() => setShowEditForm(!showEditForm)}
                    className={styles['account-details__edit-button']}
                  >
                    <svg className="icon" role="presentation">
                      <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <span className="screen-reader-text">Edit</span>
                  </button>
                </div>
                {showEditForm ? <PaymentDetailsForm /> : ''}
              </div>
            </div>

            <button className={`${styles['account__title']} ${panelThree ? styles['is-active'] : null}`} onClick={() => handlePanelClick(3)}>
              <span>Information</span>
              <i className={styles['account__title-arrow']}>
                <svg className="icon" role="presentation">
                  <use xlinkHref="#icon-chevron-down"></use>
                </svg>
              </i>
            </button>
            <div className={`${styles['account__content']} ${panelThree ? styles['is-active'] : null}`}>
              <div className={styles['account__content-inner']}>
                <div className={styles['account__name-container']}>
                  <div className={styles['profile-badge']}>
                    <span className={styles['profile-badge__initials']}>
                      {initials}
                    </span>
                  </div>
                  <h3 className={styles['account__name']}>{fullName}</h3>
                </div>

                <div className={styles['account-details']}>
                  <div className={styles['account-details__title']}>
                    <h3>Details</h3>
                  </div>
                  <div className={styles['account-details__content']}>
                    <p>
                      {fullName} <br />
                      {email} <br />
                      {phone} <br />
                    </p>
                    {/* <p>
                      21 Spooky Lane
                      <br />
                      Spooksville, 666123
                      <br />
                      New Zealand
                    </p> */}
                  </div>
                  <button className={styles['account-details__edit-button']}>
                    <svg onClick={() => setShowEditForm(!showEditForm)} className="icon" role="presentation">
                      <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <span className="screen-reader-text">Edit</span>
                  </button>
                </div>
                {showEditForm ? <AccountDetailsForm /> : ''}
              </div>
            </div>

            <button className={`${styles['account__title']} ${panelFour ? styles['is-active'] : null}`} onClick={() => handlePanelClick(4)}>
              <span>Subscriptions</span>
              <i className={styles['account__title-arrow']}>
                <svg className="icon" role="presentation">
                  <use xlinkHref="#icon-chevron-down"></use>
                </svg>
              </i>
            </button>
            <div className={`${styles['account__content']} ${panelFour ? styles['is-active'] : null}`}>
              <div className={styles['account__content-inner']}>
                <div className={styles['account__name-container']}>
                  <div className={styles['profile-badge']}>
                    <span className={styles['profile-badge__initials']}>
                      {initials}
                    </span>
                  </div>
                  <h3 className={styles['account__name']}>{fullName}</h3>
                </div>
                <div className={styles['account__subscriptions-details-container']}>
                  <button className={`${styles['account__subscriptions-details-tab-link']} ${styles['is-active']}`} >Available</button> / <button className={styles['account__subscriptions-details-tab-link']}>Expired</button>
                </div>
                <SubscriptionsDetails />
              </div>
            </div>

          </div>
        </div>
      </section>
    </LayoutDefault>
  )
}

export default Account
