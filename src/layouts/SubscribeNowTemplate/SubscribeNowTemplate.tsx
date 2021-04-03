import React, { useEffect } from 'react'
import PaymentWrapper from '../../scenes/Payment/PaymentWrapper'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/RootState'
import SeoHead from '../../components/SeoHead/SeoHead'

export interface ISubscribeNowTemplateProps {
}


const SubscribeNowTemplate: React.FC<ISubscribeNowTemplateProps> = (props) => {
  let userId = useSelector<RootState, string | undefined>((state) => state.userSecurity.profile?.id || undefined)

  /*TagManager.dataLayer({
    dataLayer: {
      userId,
      userProject: 'Sideline Live',
      page: `/browse`
    },
    dataLayerName: 'PageDataLayer'
  })*/

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (<div>
    <SeoHead metaDescription={'Subscribe Now'} ogDescription={'Subscribe Now'} ogImage={''} ogTitle={'Subscribe Now'} title={'Subscribe Now'} />
    {
      <PaymentWrapper tagInfo={undefined} eventId={undefined}></PaymentWrapper>
    }
  </div >)
}

export default SubscribeNowTemplate
