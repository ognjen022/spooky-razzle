import React from 'react'
import moment from 'moment'
import { IStream } from '../../services/content/tags/models'
import Ticker from '../Ticker/Ticker'

interface ILiveNowProps {
  streams: IStream[]
}

const LiveNow: React.FC<ILiveNowProps> = (props: ILiveNowProps) => {

  const { streams } = props

  const liveStreams = streams?.filter(stream => {
    return moment(stream.startTime).isBetween(moment(), moment().add(2, 'hours'))
  })

  liveStreams.sort((a, b) => a.startTime.valueOf() - b.startTime.valueOf())

  const timeUntillNextStream = moment().to(moment(liveStreams[0]?.startTime));

  const tickerText = `NEXT STREAM IS COMING UP IN ${timeUntillNextStream.toUpperCase()}. WATCH LIVE HERE NOW TO BE`

  return (
    <>
      {liveStreams.length > 0 && <Ticker text={tickerText} link={undefined} />}
    </>
  )
}

export default LiveNow