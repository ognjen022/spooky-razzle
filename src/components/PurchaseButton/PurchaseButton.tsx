import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button'
import { IStream, ITag, VideoStreamStatus } from '../../services/content/tags/models'
import { RootState } from '../../services/RootState';
import { selectVideoStreamStatus } from '../../services/content/tags/selectors'
import { showPurchaseModalToggledEvent } from '../../services/payments/purchase/events';
import { selectHasProduct } from '../../services/payments/subscriptions/selectors';
import { selectGamePassPriceFormatted, selectSeasonPassPriceFormatted } from '../../services/payments/products/selectors';
import { selectIsLoggedIn } from '../../services/userSecurity/token/selectors';
import { accountToggleLoginEvent } from '../../services/userSecurity/accountDetails/events';

interface IPurchaseButtonProps {
  stream: IStream | undefined
  mainTag: ITag | undefined,
  classNames?: string | undefined
}

const PurchaseButton: React.FC<IPurchaseButtonProps> = (props: IPurchaseButtonProps) => {

  const labelStyle = {
    width: '100%',
  };

  const seasonPassPrice = props.mainTag ? 
    `$${((props.mainTag.pricing ?? 2995) / 100).toString()}` : '$29.95';
  
  const isLoggedIn = useSelector<RootState, boolean>(state => selectIsLoggedIn(state.userSecurity.token))

  const gamePassPrice = useSelector<RootState, string>(state => selectGamePassPriceFormatted(state.payments.products, state.configuration));
  const { stream, mainTag } = props
  const dispatch = useDispatch()
  const streamStatus = useSelector<RootState, VideoStreamStatus>(state => selectVideoStreamStatus(state, stream))
  const hasProduct = useSelector<RootState, boolean>(state => selectHasProduct(state.payments.subscriptions, mainTag?.stripeProductId || '', state.configuration))

  const renderButtons = () => {
    return (
      <>
        <p style={labelStyle}>
          You can unlock this stream by purchasing it as one-off, or by subscribing to our monthly watch it all plan, or through it's tournament page.
        </p>
        <p style={{width: '100%', justifyContent: mainTag?.stripeProductId ? '' : 'flex-end'}}>
          {
            (mainTag?.stripeProductId || stream) &&
            <Button
              onClick={() => handleClick(mainTag?.stripeProductId, mainTag?.id || undefined, stream?.eventId)}
              type="submit"
              variant="secondary"
              color="ghost-green"
              label={`Purchase for ${mainTag ? seasonPassPrice : gamePassPrice}`}
            />
          }
          <Button
            style={{flex: mainTag?.stripeProductId ?  '1' : '.4'}}
            onClick={() => handleClick(undefined, undefined, undefined)}
            type="submit"
            variant="secondary"
            color="success"
            label="Subscribe to watch it all"
          />
        </p>
      </>
    )
  }
  const handleClick = (product, tag, eventId) => {
    if (!isLoggedIn) {
      dispatch(accountToggleLoginEvent(() => showPurchaseModalToggledEvent(product, tag, eventId)));
    }
    else {
      dispatch(showPurchaseModalToggledEvent(product, tag, eventId));
    }
  }
  
  if (streamStatus === VideoStreamStatus.FreeNotLoggedIn)
    return (
      <>
       
      </>
    )

  if (streamStatus === VideoStreamStatus.Free || (hasProduct || streamStatus === VideoStreamStatus.Purchased))
    return (
      <>
      </>
    )

  
  if (!hasProduct || streamStatus === VideoStreamStatus.NotPurchased || streamStatus === VideoStreamStatus.NotPurchasedNotLoggedIn) {
    
    if (props.classNames) 
      return (
        <div className={props.classNames}>
          {renderButtons()}
        </div>
      )
    
    return (
      renderButtons()
    )
  }
  return <></>
}

export default PurchaseButton