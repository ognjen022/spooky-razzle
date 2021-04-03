import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product, { productColor, productPricingSize } from '../../components/Product/Product'
import ListItem from '../../components/ListItem/ListItem'
import { selectGamePassPriceFormatted, selectSeasonPassPriceFormatted, selectWatchItAllPriceFormatted } from '../../services/payments/products/selectors'
import { RootState } from '../../services/RootState'
import Banner from '../../components/Banner/Banner';
import styles from './Pricing.module.scss'
import InlinePostGroup from '../../components/InlinePost/InlinePostGroup';
import { selectIsLoggedIn } from '../../services/userSecurity/token/selectors'
import { accountToggleForgotPasswordEvent, accountToggleLoginEvent } from '../../services/userSecurity/accountDetails/events';
import { showPurchaseModalToggledEvent } from '../../services/payments/purchase/events'
import { selectHasWatchItAll } from '../../services/payments/subscriptions/selectors'

import { v4 as uuidv4 } from 'uuid';

export interface IPricing {
}

const pricingFaqs: any[] = [
  {
    question: "Why do most people upgrade to Watch it all?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br />"
      + "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "How do I buy a game or season pass?",
    answer: "You can buy a game or competition pass from their respective pages. The "
      + "purchasing options for games and tournaments are just beneath their descriptions. "
  },
  {
    question: "Can I upgrade to a premium subscription at any point?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br />"
      + "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "How do I cancel my monthly subscription?",
    answer: "With Sideline.Live there are no fixed-term contracts. "
      + "You can easily cancel your monthly subscription by emailing <a href='mailto:support@sideline.live'>support@sideline.live</a>. "
      + "There are no cancellation fees – start or stop your account at any time.<br />"
      + "If you cancel your monthly subscription, you'll still have access until the end of the period you've paid for."
  },
  {
    question: "Can I get a discount for my team or school?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br />"
      + "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }];

const Pricing: React.FC<IPricing> = (props: IPricing) => {
  const watchItAllPriceFormatted = useSelector<RootState, string>(state => selectWatchItAllPriceFormatted(state.payments?.products, state.configuration))
  const gamePassPriceFormatted = useSelector<RootState, string>(state => selectGamePassPriceFormatted(state.payments?.products, state.configuration))
  const seasonPassPriceFormatted = useSelector<RootState, string>(state => selectSeasonPassPriceFormatted(state))

  const hasWatchItAll = useSelector<RootState, boolean>(state => selectHasWatchItAll(state.payments.subscriptions, state.configuration))

  const isLoggedIn = useSelector<RootState, boolean>(state => selectIsLoggedIn(state.userSecurity.token))

  const dispatch = useDispatch();

  const subscribeNowClicked = () => {
    if (!isLoggedIn) {
      dispatch(accountToggleLoginEvent(() => showPurchaseModalToggledEvent(undefined, undefined, undefined)));
    }
    else {
      dispatch(showPurchaseModalToggledEvent(undefined, undefined, undefined));
    }
  }
  return (
    <>
      <Banner text={'You can buy game or competition passes from their respective pages'} />
      <div className={`${styles['page']} container`}>
        <h2>Pricing</h2>
        <div className={styles['pricing']}>
          <Product
            features={[
              'Watch a events live',
              'Watch unlimited on demand',
              'Watch on any device'
            ]}
            disableAccordion={true}
            onModal={false}
            color={productColor.green}
            showPurchaseButton={false}
            title={'Game Pass'}
            pricingSize={productPricingSize.lg}
            price={`${gamePassPriceFormatted}`} />
          <Product
            description={'*Season Passes may vary in price'}
            features={[
              'Watch any event live from your selected season',
              'Watch unlimited on demand',
              'Watch on any device'
            ]}
            onModal={false}
            disableAccordion={true}
            color={productColor.green}
            showPurchaseButton={false}
            title={'Season Pass'}
            pricingSize={productPricingSize.lg}
            price={`${seasonPassPriceFormatted}`} />
          <Product
            features={[
              'Watch all events live',
              'Includes all competitions',
              'No fixed term contracts',
              'Watch unlimited on demand',
              'Watch on any device'
            ]}
            disableAccordion={true}
            onModal={false}
            onSubscribeNowClicked={() => subscribeNowClicked()}
            color={productColor.green}
            showPurchaseButton={!hasWatchItAll}
            title={'Watch It All'}
            pricingSize={productPricingSize.lg}
            price={`${watchItAllPriceFormatted} / Month`} />
        </div>
        <h2>Features</h2>

        <div className={styles['features']}>
          <ListItem
            key={uuidv4()}
            shortText={[
              'Watch anytime,',
              'live and on demand.',
              'Watch anywhere,on any device.'
            ]}
            longText={'You can watch on any internet connected device. So you can tune in whenever you’re online, wherever you are in the world.'}
            number={'1'} />
          <ListItem
            key={uuidv4()}
            shortText={[
              'Watch a game.',
              'Or stay for the season.'
            ]}
            longText={'We want as many supporters as possible to connect with the teams they love. With affordable and varied pricing, you can decide how much you watch, and when. Watch a one-off game for the price of a coffee, sign up for a whole season, or subscribe monthly – it’s up to you.'}
            number={'2'} />
          <ListItem
            key={uuidv4()}
            shortText={[
              'Follow your school,',
              'your club, your team.'
            ]}
            longText={'We want to make it easy for you to follow the teams you love. So we’ve built a platform for everyone, big and small. And we have journalists dedicated to covering grassroots sport, so you’ll never miss a story about your game.'}
            number={'3'} />

        </div>
        <h2>Pricing FAQs</h2>
        <div className={styles['faqs']}>

          <InlinePostGroup data={pricingFaqs} />
        </div>
      </div>
    </>)
}

export default Pricing