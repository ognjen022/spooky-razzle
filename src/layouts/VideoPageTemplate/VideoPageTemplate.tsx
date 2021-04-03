import React, { useEffect, useState } from 'react'
import { ITag, IStream, ITicker, ITagIndex } from '../../services/content/tags/models'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../services/RootState'
import { selectMainTag, selectTag, selectMainTagStreams, selectHasLoaded, getTagsFull } from '../../services/content/tags/selectors'
import Ticker from '../../components/Ticker/Ticker'
import VideoStreamerSingle from '../../components/VideoStreamer/VideoStreamerSingle'
import LineUpMulti from '../../components/LineUpMulti/LineUpMulti'
import { useParams } from 'react-router-dom'
import { selectIsLoggedIn } from '../../services/userSecurity/token/selectors'
import { goBack } from 'connected-react-router'
import moment from 'moment'
import * as _ from 'lodash'
import TagManager from 'react-gtm-module'
import TagNoContent from '../../scenes/TagNoContent/TagNoContent'
import EventSeoHead from '../../components/SeoHead/EventSeoHead'

export interface IVideoPageTemplateProps {
  readonly mainTag: ITag
}

const getTicker = (mainTag: ITag | undefined): ITicker | undefined => {
  if (!mainTag || !mainTag.ticker || mainTag.ticker.length === 0) return undefined
  return mainTag.ticker[0]
}

const VideoPageTemplate: React.FC<IVideoPageTemplateProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const { eventIdParam } = useParams() as any
  let eventId: number = 0//
  try {
    eventId = parseInt(eventIdParam)
  } catch {
    console.log('Invalid eventId parameter ', eventIdParam)
  }

  const [playing, setPlaying] = useState(false)
  const [, setShowModal] = useState(false)
  const uuidIndex = useSelector<RootState, ITagIndex[]>(state => state.content.tags.uuidIndex || [])
  const isLoggedIn = useSelector<RootState, boolean>(state => selectIsLoggedIn(state.userSecurity.token))
  const dispatch = useDispatch()

  const streams = useSelector<RootState, IStream[] | undefined>(state => state.content.tags.streams)

  const streamOrUndefined: IStream | undefined = _.find(streams || [], (stream: IStream) => stream.eventId === eventId)
  let stream: IStream | undefined = undefined
  if (streamOrUndefined && streams && streams.length > 0) {
    stream = streams[0]
  }

  const mainTag = useSelector<RootState, ITag | undefined>(state => {
    if (!streamOrUndefined || !stream) return undefined
    return selectTag(state, stream.browseTags[stream.browseTags.length - 1])
  }
  )
  const userId = useSelector<RootState, string | undefined>((state) => state.userSecurity.profile?.id || undefined)

  if (!streamOrUndefined || !stream) {
    return (<TagNoContent tagName={`Event ${eventId}`} />)
  }


  // No stream or liveStreams?
  let hasVideoStream = (stream && stream.videoStreams && stream.videoStreams?.length > 0)
  let hasBroadcast = stream && moment(stream.startTime).isSameOrAfter(moment.now())
  let autoPlay = hasVideoStream && hasBroadcast && isLoggedIn
  const lineUpTagsFull: ITag[] = stream ? getTagsFull(stream.lineUpTags, uuidIndex) : []

  /*TagManager.dataLayer({
    dataLayer: {
      userId,
      userProject: 'Sideline Live',
      page: `/play/${stream.eventId}`
    },
    dataLayerName: 'PageDataLayer'
  })*/


  return (<div>
    {
      <>

        <VideoStreamerSingle />
        {
          mainTag &&
          <LineUpMulti mainTag={mainTag} streams={[stream]} limit={1} filterTag={undefined} uuidIndex={uuidIndex} />
        }

      </>
    }
  </div >)
}

export default VideoPageTemplate
