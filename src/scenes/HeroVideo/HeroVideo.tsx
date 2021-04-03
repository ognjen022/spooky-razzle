import React, { useState } from 'react'

import styles from './HeroVideo.module.scss'

import LayoutDefault from '../../layouts/LayoutDefault/LayoutDefault'
import Button from '../../components/Button/Button'
import LazyImage from '../../components/LazyImage/LazyImage'

const HeroVideo = () => {

  const [showModal, setShowModal] = useState(false);

  return (
    <LayoutDefault>
      <section>
        <div className="container">
          <p>
            <strong>Module Hero Video</strong>
          </p>

          <div className={styles['hero-video']}>
            <div className={styles['hero-video__content']}>
              <h2>Super 8 Semi Final</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur esta adipiscing on elit. Praesent et semper est, velost maximus nibh. Ut in pulvinar
                esta augue consectetur esta adipiscing elit.
              </p>

              <ul className={styles['teams-vs-list']}>
                <li className={styles['teams-vs-list__item']}>
                  <span className={styles['teams-vs-list__image']}>
                    <LazyImage src="https://via.placeholder.com/50x50" alt="" />
                  </span>
                  <span className={styles['teams-vs-list__name']}>Francis Douglas Memorial College</span>
                </li>
                <li className={styles['teams-vs-list__item']}>
                  <span className={styles['teams-vs-list__image']}>
                    <LazyImage src="https://via.placeholder.com/50x50" alt="" />
                  </span>
                  <span className={styles['teams-vs-list__name']}>Francis Douglas Memorial College</span>
                </li>
              </ul>

              <div className={styles['hero-video__content-footer']}>
                <p>
                  <Button onClick={() => setShowModal(true)} label="Purchase" variant="secondary" color="success" />
                </p>
              </div>
            </div>
            <div className={styles['hero-video__image']}>
              <LazyImage src="http://placekitten.com/966/542" alt="" />

              <div className={styles['hero-video__premium']}>
                <svg className={styles.icon} role="presentation">
                  <use xlinkHref="#icon-premium"></use>
                </svg>
                <span>Premium</span>
              </div>

              <div className={styles['hero-video__live-indicator']}>
                <svg className={styles.icon} role="presentation">
                  <use xlinkHref="#icon-live"></use>
                </svg>
                <span>Live</span>
              </div>

              <div className={styles['hero-video__date']}>
                <span>TUE 7th Jan - 4.00 PM</span>
              </div>

              <a href="/" className={styles['hero-video__play-icon']}>
                <svg className={styles.icon} role="presentation">
                  <use xlinkHref="#icon-play"></use>
                </svg>
              </a>
            </div>
            <div className={styles['hero-video__label']}>
              <span>Featured</span>
            </div>
          </div>
        </div>
      </section>
    </LayoutDefault>
  )
}

export default HeroVideo
