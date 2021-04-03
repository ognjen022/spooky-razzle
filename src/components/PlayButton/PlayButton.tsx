import React, { useDebugValue } from 'react';
import { IStream, VideoStreamStatus } from '../../services/content/tags/models'
import { getAccessToken } from '../../services/shared/tokenLocalStorage'
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { push, routerActions } from 'connected-react-router'
import { showPurchaseModalToggledEvent } from '../../services/payments/purchase/events';
import { RootState } from '../../services/RootState';
import { selectVideoStreamStatus } from '../../services/content/tags/selectors';
import moment from 'moment'
import { isIos } from '../../utils/utils';
import { accountToggleLoginEvent } from '../../services/userSecurity/accountDetails/events';

interface PlayButtonProps extends RouteComponentProps {
  stream: IStream
  className: string
  playStream: Function
  mobileRedirectUrl: string | undefined
}

const PlayButton: React.FC<PlayButtonProps> = ({ stream, className, playStream, history, mobileRedirectUrl }) => {
  const currentDate = new Date();
  const streamDate = new Date(stream.startTime);
  const validStartTime = streamDate < currentDate;
  const dispatch = useDispatch()
  const streamStatus = useSelector<RootState, VideoStreamStatus>(state => selectVideoStreamStatus(state, stream))
  const router = useHistory();
  const handlePlayStream = () => {
    const token = getAccessToken()
    if (streamStatus === VideoStreamStatus.FreeNotLoggedIn || streamStatus === VideoStreamStatus.NotPurchasedNotLoggedIn || streamStatus === VideoStreamStatus.NotPurchased) {
      dispatch(accountToggleLoginEvent(() => showPurchaseModalToggledEvent({}, undefined, stream?.eventId)));
      //dispatch(showPurchaseModalToggledEvent({}, undefined, stream?.eventId))
    } else if (streamStatus === VideoStreamStatus.Free || streamStatus === VideoStreamStatus.Purchased) {
      if (mobileRedirectUrl) {
        router.push(mobileRedirectUrl);
        //window.location.href = mobileRedirectUrl
      } else {
        playStream()
      }
    }
  }

  if (!stream || moment().isBefore(moment(stream.startTime))) {
    return <></>
  }

  else return (
    <div role="button" className={className} onClick={handlePlayStream}>
      <svg className="icon" role="presentation">
        <use xlinkHref="#icon-play"></use>
      </svg>
    </div>
  )
}

export default withRouter(PlayButton)