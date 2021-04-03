import React, { Suspense, lazy, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router'
import { history } from './app/store'

import { ConnectedRouter } from 'connected-react-router'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Auth0Callback from './components/Auth0Callback/Auth0Callback'
import { RootState } from './services/RootState'
import Modal, { ModalSize } from './components/Modal/Modal'
import PaymentWrapper from './scenes/Payment/PaymentWrapper'
import { showPurchaseModalToggledEvent } from './services/payments/purchase/events'
import { selectShowModal, selectTagStripeProductId } from './services/payments/purchase/selectors'
import { selectHasWatchItAll } from './services/payments/subscriptions/selectors'
import { v4 as uuidv4 } from 'uuid'
import Headroom from 'react-headroom'
import Login from './scenes/Login/Login'
import {
  accountToggleForgotPasswordEvent,
  accountToggleLoginEvent,
  accountToggleSignupEvent,
  accountToggleWelcomeEvent
} from './services/userSecurity/accountDetails/events'
import SignUp from './scenes/SignUp/SignUp'
import ForgotPassword from './scenes/ForgotPassword/ForgotPassword'
import Welcome from './components/Welcome/Welcome'

// Lazy components
const Blog = lazy(() => import('./scenes/Blog/Blog'))
const TermsOfService = lazy(() => import('./scenes/TermsOfService/TermsOfService'))
const PrivacyPolicy = lazy(() => import('./scenes/PrivacyPolicy/PrivacyPolicy'))
const Account = lazy(() => import('./scenes/Account/Account'))
//const SubscribeNowTemplate = lazy(() => import('./layouts/SubscribeNowTemplate/SubscribeNowTemplate'))
const PricingTemplate = lazy(() => import('./layouts/PricingTemplate/PricingTemplate'))
const VideoStreamer = lazy(() => import('./components/VideoStreamer/VideoStreamer'))
const VideoPageTemplate = lazy(() => import('./layouts/VideoPageTemplate/VideoPageTemplate'))
const Error404 = lazy(() => import('./scenes/Error404/Error404'))

const MyStreamsTemplate = lazy(() => import('./layouts/MyStreamsTemplate/MyStreamsTemplate'))
const Browse = lazy(() => import('./scenes/Browse/Browse'))
const About = lazy(() => import('./scenes/About/About'))
const AboutAwarenessLead = lazy(() => import('./scenes/About/AboutAwarenessLead'))
const AboutConsiderationLead = lazy(() => import('./scenes/About/AboutConsiderationLead'))
const AboutConversionLead = lazy(() => import('./scenes/About/AboutConversionLead'))
const Contact = lazy(() => import('./scenes/Contact/Contact'))
const TagNoContent = lazy(() => import('./scenes/TagNoContent/TagNoContent'))
const TemplateSwitch = lazy(() => import('./layouts/TemplateSwitch/TemplateSwitch'))
const NewsTemplate = lazy(() => import('./layouts/NewsTemplate/NewsTemplate'))
const NewsArticleTemplate = lazy(() => import('./layouts/NewsArticleTemplate/NewsArticleTemplate'))
const Faq = lazy(() => import('./scenes/Faq/Faq'))

const MOBILE_BREAKPOINT: number = 768

const RoutesSwitch = () => {
  const dispatch = useDispatch()
  const routePathname = useSelector<RootState, string | undefined>(state => state.router?.location?.pathname)
  const showModal = useSelector<RootState, boolean>(state => selectShowModal(state.payments.purchase))
  const tagInfo = useSelector<RootState, string | undefined>(state => selectTagStripeProductId(state.payments.purchase))
  const purchaseEventId = useSelector<RootState, number | undefined>(state => state.payments.purchase.eventId)
  const hasWatchItAll = useSelector<RootState, boolean>(state => selectHasWatchItAll(state.payments.subscriptions, state.configuration))

  const showLoginModal = useSelector<RootState, boolean>(state => state.userSecurity.accountDetails.showLogin)
  const showSignupModal = useSelector<RootState, boolean>(state => state.userSecurity.accountDetails.showSignup)
  const showForgotPassword = useSelector<RootState, boolean>(state => state.userSecurity.accountDetails.showForgotPassword)

  const showWelcomePage = useSelector<RootState, boolean>(state => state.userSecurity.accountDetails.showWelcomePage)
  useEffect(() => {}, [routePathname])

  useEffect(() => {
    let payload = uuidv4()
    dispatch({ type: 'POLL_TICKED', payload })
  }, [])

  dispatch({ type: 'PAGE_INITIALIZED', payload: [] })
  return (
    <>
      {window.innerWidth <= MOBILE_BREAKPOINT && (
        <Headroom
          style={{
            zIndex: 9999,
            webkitTransition: 'all .25s ease-in-out',
            mozTransition: 'all .25s ease-in-out',
            oTransition: 'all .25s ease-in-out',
            transition: 'all .25s ease-in-out'
          }}
          upTolerance={0.1}
          downTolerance={0.1}
        >
          <Header hasWatchItAll={hasWatchItAll} />
        </Headroom>
      )}
      {window.innerWidth > MOBILE_BREAKPOINT && <Header hasWatchItAll={hasWatchItAll} />}

      <Modal modalSize={ModalSize.sm} display={showLoginModal} handleCloseModal={() => dispatch(accountToggleLoginEvent())}>
        <Login />
      </Modal>
      <Modal modalSize={ModalSize.sm} display={showSignupModal} handleCloseModal={() => dispatch(accountToggleSignupEvent())}>
        <SignUp />
      </Modal>
      <Modal modalSize={ModalSize.sm} display={showForgotPassword} handleCloseModal={() => dispatch(accountToggleForgotPasswordEvent())}>
        <ForgotPassword />
      </Modal>
      <Modal modalSize={ModalSize.lg} display={showWelcomePage} handleCloseModal={() => dispatch(accountToggleWelcomeEvent())}>
        <Welcome />
      </Modal>
      <Modal
        modalSize={ModalSize.md}
        display={showModal}
        handleCloseModal={() => dispatch(showPurchaseModalToggledEvent({}, undefined, undefined))}
      >
        <PaymentWrapper tagInfo={tagInfo} eventId={purchaseEventId} />
      </Modal>
      <Suspense fallback={null}>
        <Switch>
          <Route exact path="/" component={TemplateSwitch} />
          <Route exact path="/news" component={NewsTemplate} />
          <Route path="/news/:title" component={NewsArticleTemplate} />
          <Route exact path="/my-streams" component={MyStreamsTemplate} />
          <Route path="/pricing" component={PricingTemplate} />

          <Route exact path="/blog" component={Blog} />
          <Route exact path="/terms-of-service" component={TermsOfService} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/account" component={Account} />
          <Route path="/google-callback" component={Auth0Callback} />
          <Route path="/facebook-callback" component={Auth0Callback} />
          <Route path="/browse" component={Browse} />
          <Route path="/contact" component={Contact} />
          <Route path="/video-streamer" component={VideoStreamer} />
          <Route path="/404" component={Error404} />
          <Route path="/about" component={About} />
          <Route path="/faq" component={Faq} />
          <Route path="/play/:eventIdParam" component={VideoPageTemplate} />
          <Route path="/tag-no-content" component={TagNoContent} />
          <Route path="/about-awareness" component={AboutAwarenessLead} />
          <Route path="/about-consideration" component={AboutConsiderationLead} />
          <Route path="/about-conversion" component={AboutConversionLead} />
          <Route path="*" component={TemplateSwitch} />
        </Switch>
      </Suspense>
      <Footer />
    </>
  )
}

const Routes = () => {
  return (
    <ConnectedRouter history={history}>
      <RoutesSwitch></RoutesSwitch>
    </ConnectedRouter>
  )
}

export default Routes
