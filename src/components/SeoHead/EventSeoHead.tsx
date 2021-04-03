import React from 'react'
import { IStream } from '../../services/content/tags/models'
import SeoHead from './SeoHead'

interface IEventSeoHead {
  readonly stream: IStream
}

const EventSeoHead: React.FC<IEventSeoHead> = (props) => {
  const { stream } = props
  if (!stream) return <></>

  return (
    <SeoHead metaDescription={stream.description} title={stream.name} ogDescription={stream.name} ogTitle={stream.name} ogImage={stream.image} />
  )
}

export default EventSeoHead
