import React from 'react'
import { useSelector } from 'react-redux';
import Input from '../../components/Input/Input'
import { PromoInformation } from '../../services/payments/purchase/models';
import { selectPromoCode } from '../../services/payments/purchase/selectors';
import { RootState } from '../../services/RootState';

import styles from './PromoCode.module.scss'

interface IPromoCodeProps {
    data: any;
}

const PromoCode: React.FC<IPromoCodeProps> = (props) => {

  const checkingPromo = useSelector<RootState, boolean>(state => state.payments.purchase.checkingPromo);
  const promo = useSelector<RootState, PromoInformation | undefined>(state => selectPromoCode(state.payments.purchase))
  return (
    <div className={styles['promo-code']}>
      <Input  data={props.data} placeholder={'Promo code'} label="promoCode" type="text"   />
      
        {
            (!checkingPromo && !promo?.error && promo?.nextPayment) &&
             <svg className="icon" role="presentation">
                <use xlinkHref="#icon-check"></use>
            </svg> 
        }
        
        {
            (!checkingPromo && promo?.error && !promo?.nextPayment) &&
             <svg className="icon" role="presentation">
                <use xlinkHref="#icon-invalid"></use>
            </svg> 
        }
        {
            checkingPromo && 
            <svg className="icon icon-loading" role="presentation">
                <use xlinkHref="#icon-loading"></use>
            </svg>
        }
    </div>
  )
}

export default PromoCode
