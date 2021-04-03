import React, { useEffect, useRef } from 'react'
import Routes from './Routes'
import './styles/main.scss'
import Notifications from 'react-notification-system-redux'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './services/RootState'
import { configRequestedEvent } from './services/config/events'

import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js'

import { createBrowserHistory, createMemoryHistory } from 'history'
import { selectShowModal } from './services/payments/purchase/selectors'
import { isMobile } from './utils/utils'

// react azure insight implemetation to highest level component

export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement)

export const browserHistory = isServer
  ? createMemoryHistory({
      initialEntries: ['/']
    })
  : createBrowserHistory({ basename: '' })

const reactPlugin = new ReactPlugin()

function App() {
  let notifications = useSelector<RootState, any>(state => state.notifications)

  let instrumentationKey = useSelector<RootState, string | undefined>(state => state.configuration.instrumentation_key)

  const isModalOpen = useSelector<RootState, boolean>(
    state =>
      state.userSecurity.accountDetails.showForgotPassword ||
      state.userSecurity.accountDetails.showLogin ||
      state.userSecurity.accountDetails.showSignup ||
      state.userSecurity.accountDetails.showWelcomePage ||
      selectShowModal(state.payments.purchase)
  )

  const component = React.createRef<HTMLDivElement>()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(configRequestedEvent())
  })

  useEffect(() => {
    if (!isMobile()) {
      ;(component.current as any).parentElement.parentElement.parentElement.style.overflow = isModalOpen ? 'hidden' : 'auto'
    }
  }, [isModalOpen])

  useEffect(() => {
    if (instrumentationKey !== undefined) {
      const appInsights = new ApplicationInsights({
        config: {
          instrumentationKey: instrumentationKey,
          extensions: [reactPlugin as any],
          extensionConfig: {
            [reactPlugin.identifier]: { history: browserHistory }
          }
        }
      })
      appInsights.loadAppInsights()
    }
  }, [instrumentationKey])
  return (
    <div ref={component}>
      <Notifications notifications={notifications} />
      <Routes />
    </div>
  )
}

export default withAITracking(reactPlugin, App)
