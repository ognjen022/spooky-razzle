import React, { memo } from 'react'
import styles from './Footer.module.scss'
import { Link } from 'react-router-dom'

import LiveLogo from '../../svg/images/live-logo.svg'
import LazyImage from '../LazyImage/LazyImage'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container" >
        <div className={styles['footer__top']}>
          <a href="#root" className={styles['button-top']}>
            <svg className="icon hide-medium" role="presentation">
              <use xlinkHref="#icon-arrow-up"></use>
            </svg>
            <svg className="icon show-medium" role="presentation">
              <use xlinkHref="#icon-chevron-up"></use>
            </svg>
            <span className="screen-reader-text">Back to top</span>
          </a>
        </div>
        <div className={styles['footer__inner']}>
          <Link to={'/'} className={styles['footer__logo']}>
            <LazyImage src={LiveLogo} alt="Live" />
          </Link>

          <div className="footer__column hide-medium">
            <p>
              <strong>Powered by Live</strong>
            </p>
          </div>

          <div className={`footer__column ${styles['footer--terms']}`}>
            <nav className="footer-nav">
              <ul className={styles['footer-nav__list']}>
                <li className={styles['footer-nav__list-item']}><strong>&copy; LIVEEVENTAPP</strong></li>
                <li className={styles['footer-nav__list-item']}>
                  <Link to={'/terms-of-service'} href="" className={styles['footer-nav__link']}>
                    Terms of Service
                  </Link>
                </li>
                <li className={styles['footer-nav__list-item']}>
                  <Link to={'/privacy-policy'} className={styles['footer-nav__link']}>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={`footer__column ${styles['footer--company']}`}>
            <nav className={styles['footer-nav']}>
              <ul className={styles['footer-nav__list']}>
                <li className={styles['footer-nav__list-item']}>
                  <strong>Company</strong>
                </li>
                <li className={styles['footer-nav__list-item']}>
                  <Link to={'/about'} className={styles['footer-nav__link']}>
                    About
                  </Link>
                </li>
                <li className={styles['footer-nav__list-item']}>
                  <Link to={'/contact'} className={styles['footer-nav__link']}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={`footer__column ${styles['footer--customers']}`}>
            <nav className="footer-nav">
              <ul className={styles['footer-nav__list']}>
                <li className={styles['footer-nav__list-item']}>
                  <strong>Customers</strong>
                </li>
                <li className={styles['footer-nav__list-item']}>
                  <Link to={'/pricing'} className={styles['footer-nav__link']}>
                    Pricing
                  </Link>
                </li>
                <li className={styles['footer-nav__list-item']}>
                  <Link to={'/faq'} className={styles['footer-nav__link']}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={`footer__column ${styles['footer--socials']}`}>
            <nav className={styles['footer-social-nav']}>
              <ul className={styles['footer-social-nav__list']}>
                <li className={styles['footer-social-nav__list-item']}>
                  <a href="https://www.facebook.com/sidelinelivenz" className={styles['footer-social-nav__link']} target="_blank" rel="noopener">
                    <svg className="icon icon-footer" role="presentation">
                      <use xlinkHref="#icon-social-facebook"></use>
                    </svg>
                    <span className="screen-reader-text">Facebook</span>
                  </a>
                </li>
                <li className={styles['footer-social-nav__list-item']}>
                  <a href="https://twitter.com/SidelineLive" className={styles['footer-social-nav__link']} target="_blank" rel="noopener">
                    <svg className="icon icon-footer" role="presentation">
                      <use xlinkHref="#icon-social-twitter"></use>
                    </svg>
                    <span className="screen-reader-text">Twitter</span>
                  </a>
                </li>
                <li className={styles['footer-social-nav__list-item']}>
                  <a href="https://www.instagram.com/sideline.live/" className={styles['footer-social-nav__link']} target="_blank" rel="noopener">
                    <svg className="icon icon-footer" role="presentation">
                      <use xlinkHref="#icon-social-instagram"></use>
                    </svg>
                    <span className="screen-reader-text">Instagram</span>
                  </a>
                </li>
              </ul>
            </nav>

            <div className="footer__column show-medium">
              <p>
                <strong>Powered by Live</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
