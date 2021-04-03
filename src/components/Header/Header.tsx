import React, { memo, useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import LiveLogo from '../../svg/images/live-logo.svg'
import { RootState } from '../../services/RootState'
import { selectIsLoggedIn, selectIsTokenValid } from '../../services/userSecurity/token/selectors'
import { selectInitials, selectIntercomInfo } from '../../services/userSecurity/profile/selectors'
import { tokenRemovedEvent, tokenRefreshTokenRequestedEvent } from '../../services/userSecurity/token/events'
import { configRequestedEvent } from '../../services/config/events'
import { tagsRequestedEvent } from '../../services/content/tags/events'
import { selectHasWatchItAll } from '../../services/payments/subscriptions/selectors'
import { v4 as uuidv4 } from 'uuid'
import Button from '../Button/Button'
import { IStream } from '../../services/content/tags/models'
import { profileReceivedEvent } from '../../services/userSecurity/profile/events'
import { ProfileState } from '../../services/userSecurity/profile/models'
import { accountToggleLoginEvent, accountToggleSignupEvent } from '../../services/userSecurity/accountDetails/events'
import { showPurchaseModalToggledEvent } from '../../services/payments/purchase/events'

export interface IHeaderProps {
  hasWatchItAll: boolean
}


const Header: React.FC<IHeaderProps> = (props) => {

  let currentPathName = useSelector<RootState, string>((state) => state.router.location.pathname)
  let isLoggedIn = useSelector<RootState, boolean>((state) => selectIsLoggedIn(state.userSecurity.token))
  let isTokenValid = useSelector<RootState, boolean>((state) => selectIsTokenValid(state.userSecurity.token));
  let initials = useSelector<RootState, string>((state) => selectInitials(state.userSecurity.profile))
  let profile = useSelector<RootState, ProfileState>((state => state.userSecurity.profile));

  // let hasWathchItAll = useSelector<RootState, boolean>(state => selectHasWatchItAll(state.payments.subscriptions))
  const streams = useSelector<RootState, IStream[] | undefined>(state => state.content.tags.streams)

  const liveStreams = streams?.some(stream => {
    let now = moment()
    let streamStart = moment(stream.startTime)
    let streamEnd = moment(stream.startTime).add(stream.duration, 'm')
    let isActive = now.isBetween(streamStart, streamEnd)

    return isActive
  })
  const futureStreams = streams?.some(st => moment().isSameOrBefore(st.startTime));

  const { hasWatchItAll } = props

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(tagsRequestedEvent());
  }, [dispatch]);

if (profile.id !== null) {
  if (!isTokenValid) {
    dispatch(tokenRefreshTokenRequestedEvent()) // invalid token. refresh the token
  } else {
    dispatch({
      type: 'TOKEN_PERSIST'
    })
  }
}
  const [showMobileMenu, toggleMobileMenu] = useState(false);

  const toggleLogin = () => {
    dispatch(accountToggleLoginEvent());
  }
  const togglePremium = () => {
    dispatch(showPurchaseModalToggledEvent(undefined, undefined, undefined));
  }
  const toggleSignup = () => {
    dispatch(accountToggleSignupEvent());
  }
  const handleMobileMenuClick = () => {
    toggleMobileMenu(!showMobileMenu)
  }
  const handleMobileLogoClick = () => {
    toggleMobileMenu(!showMobileMenu);

  }
  const signOut = () => {
    window.localStorage.clear();
    dispatch(tokenRemovedEvent());
  }

  const isOpenClass = showMobileMenu ? styles['is-active'] : '';

  const navConfig = [
    {
      label: 'Home',
      link: '/',
      visible: true,
    }, {
      label: 'Browse',
      link: '/browse',
      visible: true,
    }, {
      label: 'Upcoming',
      link: '/upcoming',
      visible: futureStreams,
    }, {
      label: 'Latest',
      link: '/latest',
      visible: true,
    }, {
      label: 'My Streams',
      link: '/my-streams',
      visible: isLoggedIn,
    }, {
      label: 'News',
      link: '/news',
      visible: false,
    },
  ]

  const isSelected = (path) => path === currentPathName


  return (
    <header className={styles.header} id="top">
      <div className={`container ${styles.container}`}>
        {!isOpenClass &&
          <Link to={'/'} className={styles.header__logo}>

            <img src={LiveLogo} alt="Live" />

          </Link>}
        {isOpenClass &&
          <Link to={''} onClick={() => handleMobileLogoClick()} className={styles.header__logo}>

            <img src={LiveLogo} alt="Live" />

          </Link>}
        <nav className={`${styles['header-nav']} ${isOpenClass}`} onClick={() => handleMobileMenuClick()}>
          <ul className={styles['header-nav__list']}>

            {!isLoggedIn &&
              <>
                <li className={`${styles['header-nav__list-item']} ${styles['header-nav--mobile-show']}`}>
                  <Link to='#' onClick={() => toggleLogin()} 
                    className={`${styles['header-nav__link']}`}>
                      Log in
                    </Link>
                </li>
                <li className={`${styles['header-nav__list-item']} ${styles['header-nav--mobile-show']}`}>
                <Link
                    to='#'
                    className={`${styles['header-nav__link']}`}
                  >
                    <Button
                      variant="secondary"
                      color="success"
                      label="Sign up"
                      onClick={toggleSignup}
                    />
                  </Link>
                </li>
              </>
            }

            {isSelected('/live-now') ? (
              <li className={styles['header-nav__list-item']} key={uuidv4()}>
                <span className={`${styles['is-selected']} ${styles['header-nav--mobile-hide']}`}>
                  Live now
                </span>

                <Link to="/live-now" className={`${styles['header-nav__link']} ${styles['header-nav__live-now-button']} ${styles['header-nav--mobile-show']}`}>
                  <Button
                    variant="secondary"
                    color={liveStreams ? "success" : "ghost"}
                    label="live now"
                    disabled={!liveStreams}
                  />
                </Link>
              </li>
            ) :
              <>
                {liveStreams &&
                  <li className={styles['header-nav__list-item']} key={uuidv4()}>
                    <Link to="/live-now" className={`${styles['header-nav__link']} ${styles['header-nav__live-now-button']}`}>
                      <Button
                        variant="secondary"
                        color={liveStreams ? "success" : "ghost"}
                        label="live now"
                        disabled={!liveStreams}
                      />
                    </Link>
                  </li>
                }
              </>
            }
            {navConfig.map(({ label, link, visible }) => visible &&
              <li className={styles['header-nav__list-item']} key={uuidv4()}>
                <Link to={link} className={styles['header-nav__link']}>
                  <span className={isSelected(link) ? styles['is-selected'] : ''}>
                    {label}
                  </span>
                </Link>
              </li>
            )}

          </ul>

          <ul className={styles['header-nav__list']}>

            {!isLoggedIn &&
              <>
                <li className={`${styles['header-nav__list-item']} ${styles['header-nav--mobile-hide']}`}>
                  <Link to='#' onClick={() => toggleLogin()} 
                    className={`${styles['header-nav__link']} ${styles['header-nav__login-button']}`}>
                      Log in
                    </Link>
                </li>
                <li className={`${styles['header-nav__list-item']} ${styles['header-nav--mobile-hide']}`}>
                  <Link
                    to='#'
                    className={`${styles['header-nav__link']} ${styles['header-nav__login-button']}`}
                  >
                    <Button
                      variant="secondary"
                      color="success"
                      label="Sign up"
                      onClick={toggleSignup}
                    />
                  </Link>
                </li>
              </>
            }

            {isLoggedIn &&
            
            <>
              { !hasWatchItAll &&
                <li className={`${styles['header-nav__list-item']} ${styles['header-nav__list-item--account']}`}>
                  <Link to={'#'} onClick={togglePremium} className={` ${styles['header-nav__link']} ${styles['header-nav--green']} ${styles['header-nav__link--account']}`}>
                    Go Premium
                  </Link>
                </li>
              }
              <li className={`${styles['header-nav__list-item']} ${styles['header-nav__list-item--account']}`}>
              {
                isLoggedIn && initials &&
                  <Link to={'/account'} className={`show-large ${styles['header-nav__link']} ${styles['header-nav__link--account']}`}>
                    Account
                  </Link>
              }
              {
                isLoggedIn &&
                  <Link to='' onClick={signOut} className={`${styles['header-nav__link']} ${styles['header-nav__link--account']}`}>
                    Sign out
                  </Link>
              }
              {
                isLoggedIn && initials &&
                <Link to={'/account'} className={`hide-large ${styles['profile-badge']}`}>
                  <span className={styles['profile-badge__initials']}>{initials}</span>
                </Link>
              }
              </li>
            </>
            }

          </ul>
        </nav>

        <button className={`${styles['menu-button']} ${isOpenClass}`} onClick={() => handleMobileMenuClick()}>
          <span className="screen-reader-text">Menu</span>
          <span className={styles['menu-button__burger-icon']}></span>
        </button>
      </div>
    </header >
  )
}

export default memo(Header)
