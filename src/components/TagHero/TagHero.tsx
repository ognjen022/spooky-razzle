import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './TagHero.module.scss'

import PurchaseButton from '../PurchaseButton/PurchaseButton'
import SaveTagButton from '../../components/SaveButtons/SaveTagButton'
import { ITag, VideoStreamStatus } from '../../services/content/tags/models'
import { showPurchaseModalToggledEvent } from '../../services/payments/purchase/events'
import { selectHasProduct } from '../../services/payments/subscriptions/selectors'
import { RootState } from '../../services/RootState'
import LazyImage from '../LazyImage/LazyImage'
import LiveLogo from '../../svg/images/live-logo.svg'
import { isMobile } from '../../utils/utils'
import { selectVideoStreamStatus } from '../../services/content/tags/selectors'

interface ITagHeroProps {
  readonly mainTag: ITag
  readonly sideLabelTag: ITag | undefined
}

const TagHero: React.FC<ITagHeroProps> = (props: ITagHeroProps) => {

  const { mainTag } = props
  const dispatch = useDispatch()

  const [showMore, setShowMore] = useState<boolean>(true);
  const streamStatus = useSelector<RootState, VideoStreamStatus>(state => selectVideoStreamStatus(state, undefined))

  const hasProduct = useSelector<RootState, boolean>(state => selectHasProduct(state.payments.subscriptions, mainTag?.stripeProductId || '', state.configuration))
  
  return (
    <section>
      <div className="container">

        <div className={styles['tag-hero']}>
          <div className={styles['tag-hero__label']}>
            <span>{props.sideLabelTag?.name}</span>
          </div>

          <div className={styles['tag-hero__image']}>
            <LazyImage src={props.mainTag.icon ? props.mainTag.icon : LiveLogo} alt="Team Crest" />
          </div>
          <div className={styles['tag-hero__content']}>
            <h2>{props.mainTag.name}</h2>
            <p>
              {props.mainTag.description}
            </p>

          </div>

          <div className={styles['tag-hero__secondary-actions']}>

            <SaveTagButton tag={props.mainTag} className={styles['tag-hero__secondary-actions--save']} ></SaveTagButton>

            <div className={styles['tag-hero__secondary-actions--wrapper']}>
              {props.mainTag.facebookLink && props.mainTag.facebookLink.length > 0 &&
                <a href="/#" className={styles['tag-hero__secondary-actions--social-link']}>
                  <svg className="icon" role="presentation">
                    <use xlinkHref="#icon-social-facebook-circle"></use>
                  </svg>
                  <span className="screen-reader-text">Facebook</span>
                </a>
              }

              {props.mainTag.twitterLink && props.mainTag.twitterLink.length > 0 &&
                <a href="/#" className={styles['tag-hero__secondary-actions--social-link']}>
                  <svg className="icon" role="presentation">
                    <use xlinkHref="#icon-social-twitter-circle"></use>
                  </svg>
                  <span className="screen-reader-text">Twitter</span>
                </a>
              }

              {props.mainTag.instagramLink && props.mainTag.instagramLink.length > 0 &&
                <a href="/#" className={styles['tag-hero__secondary-actions--social-link']}>
                  <svg className="icon" role="presentation">
                    <use xlinkHref="#icon-social-instagram-circle"></use>
                  </svg>
                  <span className="screen-reader-text">Instagram</span>
                </a>
              }
            </div>
          </div>


        </div>
        {
          !mainTag?.freeToWatch &&
          <div className={styles['tag-hero__purchase-options']}>

            <div className={styles['tag-hero__purchase-options-header']}>

              <div className={styles['tag-hero__purchase-options-title']}>
                <span>
                  <svg className="icon" role="presentation">
                    <use xlinkHref="#icon-lock"></use>
                  </svg>
                  <span className="screen-reader-text">Lock</span>&nbsp;
                  {`Premium ${isMobile() ? '' : 'Competition'}`}
                </span>
              </div>
              
              <div className={styles['tag-hero__purchase-options-toggle']}>
                <button onClick={() => setShowMore(!showMore)} type="button">
                  {`${showMore ? '-' : '+'} Purchase Options`}     
                </button>
              </div>
            </div>
            {
              showMore &&
              <div className={styles['tag-hero__purchase-options-actions']}>
                <PurchaseButton stream={undefined} mainTag={props.mainTag} />
              </div>
              
            }
            
            <SaveTagButton tag={props.mainTag} className={styles['tag-hero__purchase-options--save']} ></SaveTagButton>
          </div>
        }
        {/* <div className={styles['tag-hero__secondary-actions-mobile']}>
          <div className={styles['tag-hero__secondary-actions-mobile--wrapper']}>
            {props.mainTag.facebookLink && props.mainTag.facebookLink.length > 0 &&
              <a href="/#" className={styles['tag-hero__secondary-actions--social-link']}>
                <svg className="icon" role="presentation">
                  <use xlinkHref="#icon-social-facebook-circle"></use>
                </svg>
                <span className="screen-reader-text">Facebook</span>
              </a>
            }
            {props.mainTag.twitterLink && props.mainTag.twitterLink.length > 0 &&
              <a href="/#" className={styles['tag-hero__secondary-actions--social-link']}>
                <svg className="icon" role="presentation">
                  <use xlinkHref="#icon-social-twitter-circle"></use>
                </svg>
                <span className="screen-reader-text">Twitter</span>
              </a>
            }
            {props.mainTag.instagramLink && props.mainTag.instagramLink.length > 0 &&
              <a href="/#" className={styles['tag-hero__secondary-actions--social-link']}>
                <svg className="icon" role="presentation">
                  <use xlinkHref="#icon-social-instagram-circle"></use>
                </svg>
                <span className="screen-reader-text">Instagram</span>
              </a>
            }
            <SaveTagButton tag={props.mainTag} className={styles['tag-hero__secondary-actions-mobile--save']} ></SaveTagButton>
          </div>
          
        </div> */}
      </div>
    </section>
  )
}

export default TagHero
