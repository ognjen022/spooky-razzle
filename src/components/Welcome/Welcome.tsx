
import { push } from 'connected-react-router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showPurchaseModalToggledEvent } from '../../services/payments/purchase/events';
import { RootState } from '../../services/RootState';
import { accountToggleLoginEvent, accountToggleWelcomeEvent } from '../../services/userSecurity/accountDetails/events';
import { selectIsLoggedIn } from '../../services/userSecurity/token/selectors';
import { isMobile } from '../../utils/utils';
import Button from '../Button/Button';

import styles from './Welcome.module.scss';

export interface IWelcomeProps {

}

const Welcome: React.FC<IWelcomeProps> =(props: IWelcomeProps) => {

  const isLoggedIn = useSelector<RootState, boolean>(state => selectIsLoggedIn(state.userSecurity.token))

  const dispatch = useDispatch();

  const continueFree = () => {
    push('/browse')
    dispatch(accountToggleWelcomeEvent());
  }
  const subscribeToPremium = () => {
    dispatch(accountToggleWelcomeEvent());
    if (!isLoggedIn) {
      dispatch(accountToggleLoginEvent(() => showPurchaseModalToggledEvent(undefined, undefined, undefined)));
    }
    else {
      dispatch(showPurchaseModalToggledEvent(undefined, undefined, undefined));
    }
  }
  return (
    <div className={styles['welcome']} onMouseDown={e => e.stopPropagation()}>
      <p className={styles['welcome__heading']}>
        Nice! You're all signed up.
      </p>
      {
        !isMobile() ? 
          (
            <p className={styles['welcome__body']}>
              Want to watch live sports?<br />
              Get a 'Watch it all' monthly subscription.<br/><br/>
              You can also buy a game or competition pass<br/>
              from their respective pages, or simply <br/>
              enjoy our free content!  
            </p>
          ) :

          (
            <p className={styles['welcome__body']}>
              Want to watch live sports?<br />
              Get a 'Watch it all' monthly subscription.<br/><br/>
              You can also buy a game or competition pass from their respective pages, or simply enjoy our free content!
            </p>
          )
      }

      <p className={styles['welcome__actions']}>
        <Button
          onClick={subscribeToPremium}
          type="submit"
          variant="secondary"
          color="success"
          label="Purchase Watch it all"
        />
        {/* <Button onClick={continueFree}
          type="submit"
          variant="secondary"
          color="ghost-green"
          label="Continue for free"
        /> */}
      </p>
    </div>
  )
}

export default Welcome;