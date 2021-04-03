import React, { useEffect } from 'react'
import PaymentWrapper from '../../scenes/Payment/PaymentWrapper'
import SeoHead from '../../components/SeoHead/SeoHead'
import Pricing from '../../scenes/Pricing/Pricing'

export interface IPricingTemplateProps {
}


const PricingTemplate: React.FC<IPricingTemplateProps> = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (<div>
    <SeoHead metaDescription={'Pricing'} ogDescription={'Pricing'} ogImage={''} ogTitle={'Pricing'} title={'Pricing'} />
    {
        <Pricing/>
    }
  </div >)
}

export default PricingTemplate
