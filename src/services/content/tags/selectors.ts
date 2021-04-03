import _ from 'lodash'
import moment from 'moment'

import { ITagIndex, ITag, IStream, VideoStreamStatus } from './models'
import { RootState } from '../../RootState'
import { selectIsLoggedIn } from '../../userSecurity/token/selectors'
import { selectHasWatchItAll } from '../../payments/subscriptions/selectors'
import { PurchaseHistory } from '../../payments/subscriptions/models'
import { Stream } from 'stream'

// based on the path lookup the tag
export const selectPathTagIndex = (state: RootState): ITagIndex | undefined => {
  let pathname = state.router?.location?.pathname


  if (pathname === undefined) {
    pathname = '/home'
  }

  if (pathname === '/') pathname = '/home'

  let tagMatch = _.find(state.content.tags.pathIndex, function (element: ITagIndex) { return element.index === pathname });
  return tagMatch
}

export const selectMainTag = (state: RootState): ITag | undefined => {
  let pathTagIndex = selectPathTagIndex(state)
  if (pathTagIndex === undefined) return undefined
  let result = pathTagIndex.tag

  return result
}

export const selectTag = (state: RootState, tagId: string | undefined): ITag | undefined => {
  if (tagId === undefined) return undefined
  const foundTagIndex: ITagIndex = _.find(state.content.tags.uuidIndex, (tagIndex: ITagIndex) => tagIndex.index === tagId)
  if (foundTagIndex !== undefined) {
    return foundTagIndex.tag
  }
  return undefined
}

export const selectParentTag = (state: RootState, tagId: string | undefined): ITag | undefined => {
  if (tagId === undefined) return undefined
  const mainTagIndex: ITagIndex | undefined = _.find(state.content.tags.uuidIndex, (tagIndex: ITagIndex) => tagIndex.index === tagId)
  if (mainTagIndex !== undefined && mainTagIndex.parentIndex !== undefined) {
    const parentTagInex: ITagIndex | undefined = _.find(state.content.tags.uuidIndex, (tagIndex: ITagIndex) => tagIndex.index === mainTagIndex.parentIndex)
    return parentTagInex?.tag
  }
  return undefined
}

const addStreams = (allStreams: IStream[], result: IStream[], indexes: string[], currentTag: ITag, level: number) => {
  if (level > 4) return // TODO: const for Hard Limit

  allStreams.forEach(stream => {
    if (stream.browseTags.indexOf(currentTag.id) >= 0) {
      const key = `${stream.startTime}+${stream.name}`
      if (!indexes.includes(key)) {
        indexes.push(key)
        result.push({ ...stream })
      }
    }

    if (currentTag.children && currentTag.children.length > 0) {
      currentTag.children.forEach(child => addStreams(allStreams, result, indexes, child, level + 1))
    }
  })
}

export const selectMainTagStreams = (state: RootState, mainTag: ITag | undefined): IStream[] => {

  let result: IStream[] | undefined = []
  let indexes: string[] = []
  if (mainTag === undefined) return result

  result = state.content.tags.streams?.filter((stream: IStream) => {
    return stream.browseTags.includes(mainTag.id)
  })

  result = _.sortBy(result, [function (o: IStream) { return moment(o.startTime).unix() }])

  return result || []
}

export const selectTagsChildStreams = (state: RootState, mainTag: ITag | undefined): IStream[] => {
 
  let result: IStream[] | undefined = []
  if (mainTag === undefined) return result
 
  const childTags: ITag[] | undefined = mainTag.children
  if(childTags === undefined) return result
 
  childTags.forEach(childTag => {
    const childTagStreams: IStream[] | undefined = state.content?.tags?.streams?.filter((stream: IStream) => (
      stream.browseTags.includes(childTag.id)
    ))
    childTagStreams?.map(st => result?.push(st))
  })
  result = _.sortBy(result, [function (o: IStream) { return moment(o.startTime).unix() }])
  return result || []
}

export const selectTeams = (state: RootState): ITag[] | undefined => {
  const teams: ITag | undefined = _.find(state.content.tags.tree, (t) => t.name === 'Teams');
  if (teams?.children === undefined) return undefined;
  return teams.children;
}

export const selectTagByName = (state: RootState, name: string): ITag | undefined => {
  const tagPathIndex: ITagIndex | undefined = _.find(state.content.tags.pathIndex, (t) => t.index === `/${name}`);
  if(tagPathIndex === undefined) return undefined;
  return tagPathIndex.tag;
}

export const selectHasLoaded = (state: RootState): boolean => {
  return state.content.tags.hasLoadedStreams && state.content.tags.hasLoadedTags
}

export const getTagsFull = (tagIds: string[], uuidIndex: ITagIndex[]): ITag[] => {
  let result: ITag[] = []
  if (tagIds) {
    tagIds.forEach((tag: string) => {
      const foundTagIndex: ITagIndex = _.find(uuidIndex, (tagIndex: ITagIndex) => tagIndex.index === tag)
      if (foundTagIndex !== undefined) {
        result.push(foundTagIndex.tag)
      }
    })
  }

  return result
}

const incluesAny = (list1: string[], list2: ITag[]): boolean => {
  list2.forEach(tag => {
    if (list1.includes(tag.id)) return true
  })

  return false
}

export const selectVideoStreamStatus = (state: RootState, stream: IStream | undefined): VideoStreamStatus => {

  if (!stream) return VideoStreamStatus.NotPurchased

  // find the stream
  const isLoggedIn = selectIsLoggedIn(state.userSecurity.token)

  if (!stream) return VideoStreamStatus.NotPurchasedNotLoggedIn

  // is it free? yes!
  if (stream.isFreeToWatch) {
    if (isLoggedIn) {
      return VideoStreamStatus.Free
    } else {
      return VideoStreamStatus.FreeNotLoggedIn
    }
  }

  let result: VideoStreamStatus = VideoStreamStatus.NotPurchased

  stream.browseTags.forEach(tagId => {
    const tag = selectTag(state, tagId)
    if (tag) {
      state.payments.subscriptions.items?.forEach(item => {
        if (item.product_id === tag.stripeProductId) {
          result = VideoStreamStatus.Purchased
        }
      })
    }
  })

  let livestreamEventId = '0'
  if (stream.videoStreams && stream.videoStreams.length > 0 && stream.videoStreams[0].liveStreamEventId) {
    livestreamEventId = stream.videoStreams[0].liveStreamEventId
  }
  state.payments.subscriptions?.items?.forEach((ph: PurchaseHistory) => {
    if (ph.product_id?.startsWith(`${livestreamEventId}|`) && ph.subscriptionType === 'GamePass') {
      result = VideoStreamStatus.Purchased
    }
  })

  if (selectHasWatchItAll(state.payments.subscriptions, state.configuration)) {
    result = VideoStreamStatus.Purchased
  }

  // lookup any browse tags user has purchased
  return result
}

export const filterStreamsNoLimit = (streams: IStream[], filterTag: ITag | undefined): IStream[] => {
  let filteredStreams: IStream[] = [];

  if (!streams) return filteredStreams

  for (let i = streams.length - 1; i >= 0; i--) {
    let currentStream = streams[i]
    if ((!filterTag || currentStream.browseTags.includes(filterTag.id)) || incluesAny(currentStream.browseTags, filterTag?.children || [])) {
      filteredStreams.push(currentStream)
    }
  }

  filteredStreams = _.sortBy(filteredStreams, [function (o: IStream) { return moment(o.startTime).unix() }])

  return filteredStreams
}

export const filterFeaturedStreams = (streams: IStream[], limit: number, filterTag: ITag | undefined) : IStream[] => {

  let filteredStreams: IStream[] = [];
  let tempStreams = _.filter(streams, stream => (!filterTag || stream.browseTags.includes(filterTag.id)) || incluesAny(stream.browseTags, filterTag?.children || []));
  
  let futureStreams = _.chain(tempStreams).filter(stream => moment(stream.startTime).unix() > moment(new Date()).unix()).orderBy([function (o: IStream) { return moment(o.startTime).unix() }], ['desc']).value();
  let pastStreams = _.chain(tempStreams).filter(stream => moment(stream.startTime).unix() < moment(new Date()).unix()).orderBy([function (o: IStream) { return moment(o.startTime).unix() }],['asc']).value();
  
  for (let i = futureStreams.length - 1; i >= 0; i--) {
    let currentStream = futureStreams[i]
    if (filteredStreams?.length < limit && (!filterTag || currentStream.browseTags.includes(filterTag.id)) || incluesAny(currentStream.browseTags, filterTag?.children || [])) {
      filteredStreams.push(currentStream)
    }
  }

  if (filteredStreams.length < limit) {
    for (let i = pastStreams.length - 1; i >= 0; i--) {
      let currentStream = pastStreams[i]
      if (filteredStreams?.length < limit && (!filterTag || currentStream.browseTags.includes(filterTag.id)) || incluesAny(currentStream.browseTags, filterTag?.children || [])) {
        filteredStreams.push(currentStream)
      }
    }
  } 

  
  return filteredStreams;
}

export const filterStreams = (streams: IStream[], limit: number , filterTag: ITag | undefined): IStream[] => {
  let filteredStreams: IStream[] = [];

  if (!streams) return filteredStreams

  for (let i = streams.length - 1; i >= 0; i--) {
    let currentStream = streams[i]
    if (filteredStreams?.length < limit && (!filterTag || currentStream.browseTags.includes(filterTag.id)) || incluesAny(currentStream.browseTags, filterTag?.children || [])) {
      filteredStreams.push(currentStream)
    }
  }

  filteredStreams = _.sortBy(filteredStreams, [function (o: IStream) { return moment(o.startTime).unix() }])

  return filteredStreams
}

export const selectsavedEventIds = (state: RootState): number[] => {
  return state.content?.tags?.savedEventIds || []
}

export const selectSavedTagIds = (state: RootState): string[] => {
  return state.content?.tags?.savedTagIds || []
}

// Determines if stream is LIVE or not
export const isStreamLive = (startTime: Date, duration: number | 90): boolean => {
  // A stream is playing if it has a start-time before now
  // and an end time after now (use the duration field, or 90 minutes if not set).

  const streamStartTime = moment(startTime).unix() * 1000;
  const streamEndTime = moment(startTime).add(duration, 'm').unix() * 1000;
  const currentTime = moment(new Date()).unix() * 1000;

  const beforeNow = streamStartTime < currentTime
  const afterNow = streamEndTime > currentTime

  return beforeNow && afterNow
}

export const selectSavedTagStreams = (state: RootState): IStream[][] => {
  let savedTagStreamsArray: IStream[][] = []
  if (!state || !state.content || !state.content.tags || !state.content.tags.uuidIndex) return savedTagStreamsArray

  state.content?.tags?.savedTagIds.forEach(savedTagId => {
    const savedTagIndex: ITagIndex | undefined = _.find(state.content.tags.uuidIndex, (ti: ITagIndex) => ti.index === savedTagId)

    if (savedTagIndex !== undefined) {
      const savedTagStreams: IStream[] = selectMainTagStreams(state, savedTagIndex.tag)
      if (savedTagStreams !== undefined) {
        savedTagStreamsArray.push(savedTagStreams)
      }
    }
  })

  return savedTagStreamsArray
}

export const selectStreamByLivestreamEventId = (streams: IStream[], livestreamEventId: string): IStream | undefined => {

  let match: IStream = _.find(streams, (stream: IStream) => {

    const result = stream && stream.videoStreams && stream.videoStreams.length > 0 && stream.videoStreams[0].liveStreamEventId === livestreamEventId

    if (result || stream.name.toUpperCase() === 'SUPER EIGHT ROUND 5 GAME 4') {
      // console.log('result || stream.name.toUpperCase() === \'SUPER EIGHT ROUND 5 GAME 4\'')
      // console.log('selectStreamByLivestreamEventId livestreamEventId ', livestreamEventId)
      // console.log('selectStreamByLivestreamEventId result ', result)
      // console.log('selectStreamByLivestreamEventId stream ', stream)
    }
    return result
  })

  // console.log('selectStreamByLivestreamEventId matches ', match)

  if (match != undefined) return match

  return undefined
}

export const selectSavedStreams = (state: RootState): IStream[] => {
  let savedStreams: IStream[] = []
  if (!state || !state.content || !state.content.tags || !state.content.tags.streams) return savedStreams

  state.content?.tags?.savedEventIds?.forEach(id => {
    const stream: IStream | undefined = _.find(state.content.tags.streams, (st: IStream) => st.videoStreams && st.videoStreams.length > 0 && st.eventId === id)
    if (stream !== undefined) {
      savedStreams.push(stream)
    }
  })

  return savedStreams
}

export const selectSavedTags = (state: RootState): ITag[] => {
  let savedTags: ITag[] = []
  state.content?.tags?.savedTagIds?.forEach(savedTagId => {
    const savedTagIndex: ITagIndex | undefined = _.find(state.content.tags.uuidIndex, (ti: ITagIndex) => ti.index === savedTagId)

    if (savedTagIndex !== undefined) {
      savedTags.push(savedTagIndex?.tag)
    }
  })

  return savedTags
}