import React, { useState } from 'react'
import classNames from 'classnames';
import { isMobile } from '../../utils/utils';
import Button from '../Button/Button'
import styles from './Product.module.scss'
import { debug } from 'console';

interface IProductProps {
  price: string;
  title: string;
  description?: string;
  features: string[];
  showPurchaseButton: boolean
  color: productColor;
  pricingSize?: productPricingSize;
  disableAccordion?: boolean
  onModal: boolean
  onSubscribeNowClicked?: () => void
}

export enum productColor {
  green = 'green',
  grey = 'grey'
}
export enum productPricingSize {
  lg = 'lg',
  md = 'md'
}
const Product: React.FC<IProductProps> = (props: IProductProps) => {

  const mobileView = isMobile();
  const [readMore, setReadMore] = useState<boolean>(!mobileView && !(props.disableAccordion ?? false));

  const productClasses = classNames(
    styles.product,
    styles[props.color],
    styles[props.onModal ? 'product-modal' : '']
  )

  const productHeader = classNames(
    styles.product__header,
    styles[`product__header--${props.color}`]
  )
  

  const onSubscribe = () => {
    if (props.onSubscribeNowClicked) {
        props.onSubscribeNowClicked();
    }
  }
  const readMoreClicked = () => {
    setReadMore(!readMore);
  }

  return (

    <div className={productClasses}>
    <h5 className={productHeader}>
        {props.title}
    </h5>
    
    <div className={styles['product__body']}>
      <div className={`${styles['product__pricing-group']} ${styles['product__pricing-group--' + (props.pricingSize ?? 'md')]}`}>
          <div className={styles['payment__price']}>
            {props.price}
          </div>
      </div>

      <div className={`${styles.product__content} ${(mobileView && readMore) || props.disableAccordion ? styles.active : ''}`}>
        <div className={`${styles.product__description}`}>
        {
          props.description &&
          <p>
            {props.description}
          </p>
        }
        </div>
        <ul className={`${styles['product__feature-list']}`}>
        {
            props.features.map((text, index) =>
            <li className={styles['payment__feature-list-item']} key={index}>

            <span>{text}</span>
            </li>
        )}
        </ul>
      </div>
      {
        props.showPurchaseButton && 
        <Button color="success" label="Subscribe Now" onClick={() => onSubscribe()} />
      }
      {
        mobileView && !props.disableAccordion &&
        <button onClick={readMoreClicked} type="button" className={`${styles['product__read-more']} `} >
          Read {readMore ? 'less' : 'more'} 
          <svg className={`${styles['icon']} ${styles[readMore ? 'is-active' : '']} `} role="presentation">
            <use xlinkHref="#icon-close"></use>
          </svg>
          <span className="screen-reader-text">Toggle</span>
        </button>
      }
    </div>
    </div>
    
  )
}

export default Product