import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { IStream } from '../../services/content/tags/models'
import { selectsavedEventIds } from '../../services/content/tags/selectors'
import { tagsSaveStreamEvent } from '../../services/content/tags/events'
import { RootState } from '../../services/RootState'
import { push } from 'connected-react-router'
import { selectIsLoggedIn } from '../../services/userSecurity/token/selectors'
import { isMobile } from '../../utils/utils'

interface ISaveStreamButtonProps {
  stream: IStream
  className: string,
  suffix?: string | undefined
}
const SaveStreamButton: React.FC<ISaveStreamButtonProps> = (props) => {

  const dispatch = useDispatch()
  const savedEventIds = useSelector<RootState, number[]>(state => selectsavedEventIds(state))
  const isLoggedIn: boolean = useSelector<RootState, boolean>(state => selectIsLoggedIn(state.userSecurity.token))

  const uniqueId = uuidv4()

  const stream = props.stream
  // const hasLivestreamEventId = stream && stream.videoStreams && stream.videoStreams.length > 0 && stream.videoStreams[0].liveStreamEventId
  const eventId = stream.eventId
  const [checked, setChecked] = useState(savedEventIds.includes(stream.eventId))

  const setText = (): string => {

    let prefix = 'Save'
    let suffix = props.suffix ?? 'to My Feed'
    if (isMobile()) {
      return checked ? `${prefix}d` : prefix;
    }

    return checked ? `${prefix}d ${suffix}` : `${prefix} ${suffix}`;
  }

  const onSave = () => {
    if (isLoggedIn) {
      dispatch(tagsSaveStreamEvent(eventId))
    } else {
      dispatch(push('/login-back'))
    }
  }

  useEffect(() => {
    setChecked(savedEventIds.includes(stream.eventId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedEventIds]);

  return (<>
    {
      <div className={props.className}>
        <input type="checkbox" name={`cbx_${eventId}_${uniqueId}`} id={`cbx_${eventId}_${uniqueId}`} className="is-toggle" checked={checked} onChange={onSave} />
        <label htmlFor={`cbx_${eventId}_${uniqueId}`}>{setText()}</label>
      </div>
    }
  </>)
}

export default SaveStreamButton