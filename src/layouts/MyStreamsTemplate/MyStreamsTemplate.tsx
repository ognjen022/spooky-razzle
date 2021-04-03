import React, { useEffect, useState } from 'react'

import { ITag, IStream, ITagIndex } from '../../services/content/tags/models'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../services/RootState'
import { selectHasLoaded, selectSavedTags, selectSavedTagStreams, selectSavedStreams } from '../../services/content/tags/selectors'
import MyStreamsWelcome from '../../components/MyStreamsWelcome/MyStreamsWelcome'
import VideoSingleCarousel2 from '../../components/VideoSingleCarousel/VideoSingleCarousel2'
import VideoMultiCarouselNew from '../../components/VideoMultiCarouselNew/VideoMultiCarouselNew'
import { tagsSaveTagEvent } from '../../services/content/tags/events'
import TagManager from 'react-gtm-module'
import TagNoContent from '../../scenes/TagNoContent/TagNoContent'
import Spinner from '../../components/Spinner/Spinner'

export interface IMyStreamsTemplateProps {
}

const defaultTag: ITag = {
  id: "-1",
  name: '',
  description: '',
  ticker: undefined,
  image: undefined,
  templateName: undefined,
  secondaryTag1: undefined,
  secondaryTag2: undefined,
  secondaryTag3: undefined,
  secondaryTag4: undefined,
  secondaryTag5: undefined,
  secondaryTag6: undefined,
  secondaryTag7: undefined,
  secondaryTag8: undefined,
  secondaryTag9: undefined,
  secondaryTag10: undefined,
  seoTitle: undefined,
  metaDescription: undefined,
  ogDescription: undefined,
  ogImage: undefined,
  ogTitle: undefined,
  icon: undefined,
  facebookLink: undefined,
  hideFromBrowse: false,
  pricing: undefined,
  twitterLink: undefined,
  instagramLink: undefined,
  stripeProductId: undefined,
  children: undefined,
  parent: undefined,
  path: undefined,
  copyStatement: undefined,
  streamCount: 0
}


const MyStreamsTemplate: React.FC<IMyStreamsTemplateProps> = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const dispatch = useDispatch()

  // Select data page needs from state
  const savedTagIds = useSelector<RootState, string[]>(state => state.content.tags.savedTagIds)
  const savedStreams = useSelector<RootState, IStream[]>(state => selectSavedStreams(state))
  const allStreams = useSelector<RootState, IStream[]>(state => state.content.tags.streams || [])

  const savedTags: ITag[] = useSelector<RootState, ITag[]>(state => selectSavedTags(state))
  const email = useSelector<RootState, string>(state => state.userSecurity?.profile?.email || '')
  const name = useSelector<RootState, string>(state => state.userSecurity?.profile?.name || '')

  const savedTagStreams: IStream[][] = useSelector<RootState, IStream[][]>(state => selectSavedTagStreams(state))

  const hasLoaded = useSelector<RootState, boolean>(state => selectHasLoaded(state))
  const carouselLimit: number = 100
  const uuidIndex = useSelector<RootState, ITagIndex[]>(state => state.content.tags.uuidIndex || [])
  let userId = useSelector<RootState, string | undefined>((state) => state.userSecurity.profile?.id || undefined)

  const [hasContent, setHasContent] = useState(savedTags.length > 0 || savedStreams.length > 0 ? true : false)

  useEffect(() => {
    setHasContent(savedTags.length > 0 || savedStreams.length > 0 ? true : false)
  }, [savedTags, savedStreams])

  if (!hasLoaded) return (
    <div className="container">
      <Spinner />
    </div>
  )


  /*TagManager.dataLayer({
    dataLayer: {
      userId,
      userProject: 'Sideline Live',
      page: `/my-streams`
    },
    dataLayerName: 'PageDataLayer'
  })*/

  const renderSavedTag = (index: number) => {
    return (<div key={`mystreams_savedtag_${index}`}>
      <div className="hide-large">
        <VideoMultiCarouselNew mainTag={savedTags[index]} streams={savedTagStreams[index]} limit={carouselLimit} filterTag={undefined} uuidIndex={uuidIndex} />
      </div>
      <div className="show-large">
        <VideoSingleCarousel2 mainTag={savedTags[index]} streams={savedTagStreams[index]} limit={carouselLimit} filterTag={undefined} uuidIndex={uuidIndex} />
      </div>
      <span
        style={{ marginLeft: "50px" }}
        onClick={() => handleRemoveSavedTag(savedTagIds[index])}
      >
        REMOVE
      </span>
    </div>)
  }

  const handleRemoveSavedTag = (tagId: string) => {
    dispatch(tagsSaveTagEvent(tagId))
  }

  const renderSavedStreams = () => {

    return (<>
      <VideoSingleCarousel2 mainTag={{ ...defaultTag }} streams={savedStreams} limit={carouselLimit} filterTag={undefined} uuidIndex={uuidIndex} />
    </>)
  }

  const renderNoContent = () => {
    return (<>
      <TagNoContent tagName=""></TagNoContent>
    </>)
  }

  const renderContent = () => {
    return (<>
      <MyStreamsWelcome name={name} email={email} ></MyStreamsWelcome>
      {
        renderSavedStreams()
      }
      {
        savedTagIds.map((savedTagId, index) => renderSavedTag(index))
      }
    </>)
  }

  return (
        hasLoaded && allStreams &&
        <div className="container">
          {
            !hasContent &&
            renderNoContent()
          }
          {
            hasContent &&
            renderContent()
          }
        </div>
  )
}

export default MyStreamsTemplate
