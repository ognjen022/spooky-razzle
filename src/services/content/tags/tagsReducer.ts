import { createReducer, Reducer, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

import * as eventTypes from './eventTypes'
import { ITagsState, ITagsResponse, ITag, ITagIndex, IStreamsResponse, IStream, BrowseOption, BrowseResult } from './models'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { isNumber } from 'util'

const initialState: ITagsState = {
  tree: undefined,
  // filteredTree: undefined,
  browseAll: [],
  browseFiltered: [],
  filters: [],
  streams: [],
  pathIndex: undefined,
  uuidIndex: undefined,
  mainTag: undefined,
  error: '',
  errorDescription: '',
  hasLoadedTags: false,
  hasLoadedStreams: false,
  savedEventIds: [],
  savedTagIds: [],
  filterSearchTerm: '',
  refreshKey: uuidv4(),
  visitedTags: []
}

const encodeTagName = (name: string): string => {
  /* eslint-disable */
  return name.toLocaleLowerCase().replace(/ /gi, '-').replace(/[^0-9a-z\-]/gi, '').replace(/[-]+/gi, '-').replace(/[-]+/gi, '-')
  /* eslint-enable */
}

const buildIndexes = (base: string, parent: ITag | undefined, tree: ITag[] | undefined, pathIndex: ITagIndex[], uuidIndex: ITagIndex[]) => {
  if (tree === undefined) return

  tree.forEach(element => {
    // if (element.name && element.name.length > 20) element.name = element.name.substring(0, 19) + '...'

    let path = `${base}/${encodeTagName(element.name)}`
    element.path = path

    pathIndex.push({ index: path, parentIndex: base, tag: element })
    uuidIndex.push({ index: element.id, parentIndex: parent?.id, tag: element })
    buildIndexes(path, element, element.children, pathIndex, uuidIndex)
  })
}

const setStreamTags = (streams: IStream[] | undefined, uuidIndex: ITagIndex[] | undefined): IStream[] => {
  if (!streams) return []
  if (!uuidIndex) return streams
  // we have a uuidIndex and streams

  // streams.forEach(stream => {
  // })

  var sorted = _.sortBy<IStream[]>(streams, [function (o: IStream) { return o.startTime; }])

  return sorted
}
/*
const removePeers = (newFilter: string, filters: string[], uuidIndex: ITagIndex[]): string[] => {
  // find the parent for the newFilter
  let newFilterTag: ITagIndex = _.find(uuidIndex, (element: ITagIndex) => element.index === newFilter)
  let parentTagId = newFilterTag.parentIndex
  if (parentTagId === undefined) return filters
  let parentTagIndex: ITagIndex = _.find(uuidIndex, (element: ITagIndex) => element.index === parentTagId)
  let parentTag = parentTagIndex.tag

  // build a new array that excludes all of newFilter's peers
  let newFilters: string[] = [newFilter]
  let peers = parentTag.children || []
  let peerIds: string[] = []
  peers.forEach(element => {
    peerIds.push(element.id)
  })
  filters.forEach(element => {
    if (!peerIds.includes(element)) {
      newFilters.push(element)
    }
  })

  return newFilters
}
*/

const addOrRemoveTag = (savedList: string[], itemToAddOrRemove: string): string[] => {
  let newSavedList: string[] = _.cloneDeep(savedList) || []
  if (savedList?.includes(itemToAddOrRemove)) {
    newSavedList = newSavedList.filter(item => item !== itemToAddOrRemove)
  } else {
    newSavedList.push(itemToAddOrRemove)
  }
  return newSavedList
}

const addOrRemoveStream = (savedList: number[], itemToAddOrRemove: number): number[] => {
  let newSavedList: number[] = _.cloneDeep(savedList) || []
  if (savedList?.includes(itemToAddOrRemove)) {
    newSavedList = newSavedList.filter(item => item !== itemToAddOrRemove)
  } else {
    newSavedList.push(itemToAddOrRemove)
  }
  return newSavedList
}

const findFilterTag = (tree: ITag[] | undefined): ITag[] | [] => {
  let tags: ITag[] = [];
  if (!tree)
    return [];
  for (const item of tree) {
    tags.push(item)
    if (item.children && item.children.length > 0) {
      tags.push(...findFilterTag(item.children))
    }

  }
  return tags;
}

const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const findRelatedTagIds = (tagId: string, streams: IStream[], uuidIndex: ITagIndex[]): string[] => {
  let findRelatedTagIdsResult: string[] = []

  streams.forEach(stream => {
    if (stream.browseTags.includes(tagId)) {
      stream.browseTags.forEach(browseTagId => {
        if (!stream.lineUpTags.includes(browseTagId)) {
          findRelatedTagIdsResult.push(browseTagId)
          const tagIndex: ITagIndex = _.find(uuidIndex, (t: ITagIndex) => t.index === browseTagId)
          if (tagIndex && tagIndex.parentIndex) {
            findRelatedTagIdsResult.push(tagIndex.parentIndex)
            var parent: ITagIndex = _.find(uuidIndex, (t: ITagIndex) => t.index === tagIndex.parentIndex)
            if (parent && parent.parentIndex) {
              findRelatedTagIdsResult.push(parent.parentIndex)
              var grandParent: ITagIndex = _.find(uuidIndex, (t: ITagIndex) => t.index === parent.parentIndex)
              if (grandParent && grandParent.parentIndex) {
                findRelatedTagIdsResult.push(grandParent.parentIndex)
              }
            }
          }
        }
      })
    }
  })

  findRelatedTagIdsResult = _.uniq(findRelatedTagIdsResult)
  return findRelatedTagIdsResult
}
const isNumeric = (n: any): boolean => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const buildBrowseAll = (tree: ITag[], streams: IStream[], uuidIndex: ITagIndex[]): BrowseOption[] => {
  let result: BrowseOption[] = []

  tree.forEach((branchTag: ITag) => {

    if (!branchTag.hideFromBrowse && branchTag.streamCount !== 0) {
      let browseOption: BrowseOption = {
        name: branchTag.name,
        path: branchTag.path || '',
        tagId: branchTag.id,
        parentTagId: branchTag.parent?.id || '',
        items: [],
        relatedTagIds: findRelatedTagIds(branchTag.id, streams, uuidIndex)//,
        //relatedTagNames: findRelatedTagNames(branchTag.id, streams, uuidIndex)
      }
      if (branchTag.children && branchTag.children.length > 0) {
        branchTag.children.forEach(childTag => {

          if (!childTag.hideFromBrowse && childTag.streamCount !== 0) {
            let childBrowseResult: BrowseResult = {
              name: childTag.name,
              tagId: childTag.id,
              parentTagId: childTag.parent?.id || '',
              path: childTag.path || '',
              children: [],
              showInAccordion: true,
              relatedTagIds: findRelatedTagIds(childTag.id, streams, uuidIndex)//,
              //relatedTagNames: findRelatedTagNames(childTag.id, streams, uuidIndex)
            }
            browseOption.items.push(childBrowseResult)

            childTag.children?.forEach(grandChildTag => {
              if (!grandChildTag.hideFromBrowse && grandChildTag.streamCount !== 0)  {
                let grandChildBrowseResult: BrowseResult = {
                  name: grandChildTag.name,
                  tagId: grandChildTag.id,
                  parentTagId: grandChildTag.parent?.id || '',
                  path: grandChildTag.path || '',
                  children: [],
                  showInAccordion: false,
                  relatedTagIds: findRelatedTagIds(grandChildTag.id, streams, uuidIndex)//,
                  //relatedTagNames: findRelatedTagNames(grandChildTag.id, streams, uuidIndex)
                }
                browseOption.items.push(grandChildBrowseResult)
                childBrowseResult.children.push(grandChildBrowseResult)
  
                grandChildTag.children?.forEach(greatGrandChildTag => {
                  let greatGrandChildResult: BrowseResult = {
                    name: greatGrandChildTag.name,
                    tagId: greatGrandChildTag.id,
                    parentTagId: greatGrandChildTag.parent?.id || '',
                    path: greatGrandChildTag.path || '',
                    children: [],
                    showInAccordion: false,
                    relatedTagIds: findRelatedTagIds(greatGrandChildTag.id, streams, uuidIndex)//,
                    //relatedTagNames: findRelatedTagNames(greatGrandChildTag.id, streams, uuidIndex)
                  }
                  grandChildBrowseResult.children.push(greatGrandChildResult)
                })
              }
            })
          }
        })
        if (browseOption.name !== 'Competitions') {
          browseOption.items = _.sortBy(browseOption.items, (bo: BrowseOption) => {
            // Sort by numeric characters descending, then alphanumeric characters ascending
            let sortString: string = ''
            for (let i = 0; i < bo.name.length; i++) {
              // if the character is a number invert it
              if (isNumeric(bo.name[i])) {
                let char = bo.name[i]
                let num = parseInt(char)
                let inv = 9 - num
                sortString += inv.toString()
              } else {
                // otherwise just add it to the sort string for comparison
                sortString += bo.name[i]
              }
            }

            return sortString
          })
        }
      }
      result.push(browseOption)
    }


  })

  return result
}

const filterResult = (source: BrowseResult, filters: string[], filterSearchTerm: string): BrowseResult | undefined => {

  let includesAllFilters = true // invert to change to include any filter
  filters.forEach(filter => {
    if (!source.relatedTagIds.includes(filter)) {
      includesAllFilters = false
    }
  })

  let searchFound: boolean = false
  if (filterSearchTerm && filterSearchTerm.length >= 3 && source.name.toLocaleLowerCase().includes(filterSearchTerm.toLocaleLowerCase())) {
    searchFound = true
  }

  if (includesAllFilters || filters.includes(source.tagId) || filters.includes(source.parentTagId)) {
    if (searchFound || !filterSearchTerm || filterSearchTerm.length < 3) {
      return _.cloneDeep(source)
    }
  }

  let result: BrowseResult = _.cloneDeep(source)
  result.children = []

  source.children.forEach(sourceItem => {
    let filteredResult = filterResult(sourceItem, filters, filterSearchTerm)
    if (filteredResult) {
      result.children.push(filteredResult)
    }
  })

  if (result.children.length > 0) {
    result.children = _.sortBy(result.children, [function (c: BrowseResult) { return c.name; }]);
    return result
  }

  return undefined
}

const filterOption = (source: BrowseOption, filters: string[], filterSearchTerm: string): BrowseOption | undefined => {

  let includesAllFilters = true
  filters.forEach(filter => {
    if (!source.relatedTagIds.includes(filter)) {
      includesAllFilters = false
    }
  })

  let searchFound: boolean = false
  if (filterSearchTerm && filterSearchTerm.length >= 3 && source.name.toLocaleLowerCase().includes(filterSearchTerm.toLocaleLowerCase())) {
    searchFound = true
  }

  if (includesAllFilters || filters.includes(source.tagId) || filters.includes(source.parentTagId)) {
    if (searchFound || !filterSearchTerm || filterSearchTerm.length < 3) {
      return _.cloneDeep(source)
    }
  }

  let result: BrowseOption = _.cloneDeep(source)
  result.items = []

  source.items.forEach(sourceItem => {
    let filteredResult = filterResult(sourceItem, filters, filterSearchTerm)
    if (filteredResult) {
      result.items.push(filteredResult)
    }
  })

  if (result.items.length > 0) {
    result.items = _.sortBy(result.items, [function (c: BrowseResult) { return c.name; }]);
    return result
  }

  return undefined
}

const buildBrowseFiltered = (source: BrowseOption[], filters: string[], filterSearchTerm: string): BrowseOption[] => {

  // if there is no search or filter return everything
  if (filters.length === 0 && (!filterSearchTerm || filterSearchTerm.length < 3)) return _.cloneDeep(source)

  // build a new list of matches
  let result: BrowseOption[] = []

  source.forEach(sourceOption => {
    let filteredOption = filterOption(sourceOption, filters, filterSearchTerm)
    if (filteredOption) {
      result.push(filteredOption)
    }
  })

  return result
}

const isOnLiveNowPage = (stream: IStream): boolean => {
  const today = moment()
  return moment(stream.startTime).isSame(today, 'day')
}

const isPlayingNow = (stream: IStream): boolean => {
  const now = moment()
  return moment(now).isBetween(moment(stream.startTime).add(-2, 'm'), moment(stream.startTime).add(stream.duration + 30, 'm'))
}

const applyAutoTags = (state: ITagsState) => {

  // console.log('applyAutoTags')

  let streams: IStream[] = _.cloneDeep(state.streams) || []
  let liveNowTag: ITag | undefined
  // let nowTag: ITag | undefined

  state.tree?.forEach((tag: ITag) => {
    if (tag.name === 'live-now') {
      liveNowTag = tag
    }
  })

  //console.log('applyAutoTags liveNowTag', liveNowTag)
  // console.log('applyAutoTags nowTag', nowTag)

  if (!liveNowTag) { // || !nowTag) {
    return state
  }

  let liveNowTagId = liveNowTag.id
  // let nowTagid = nowTag.id

  let newList: IStream[] = []
  let hasChanged: boolean = false
  streams.forEach((stream: IStream) => {

    if (stream.eventId === 11964) {
      // debugger
    }

    let shouldBeOnLiveNowPage = isOnLiveNowPage(stream)

    if (shouldBeOnLiveNowPage && !stream.browseTags.includes(liveNowTagId)) {
      hasChanged = true
      stream.browseTags.push(liveNowTagId)
    }

    if (!shouldBeOnLiveNowPage && stream.browseTags.includes(liveNowTagId)) {
      hasChanged = true
      const newBrowseTags: string[] = []
      stream.browseTags.forEach(tag => {
        if (tag !== liveNowTagId) newBrowseTags.push(tag)
      })
      stream.browseTags = newBrowseTags
    }

    let shouldBePlayingNow = isPlayingNow(stream)

  })

  if (hasChanged) {
    return { ...state, streams, refreshKey: uuidv4() }
  }

  return state
}

const tokenReducer: Reducer<ITagsState> = createReducer(initialState, {
  'PAGE_INITIALIZED': (state: ITagsState) => ({...state}),
  'PAGE_VISITED': (state: ITagsState, action: PayloadAction<any>) => {
    const x = [...state.visitedTags, action.payload];
    return ({
      ...state,
      visitedTags: x
    })
  },
  ['POLL_TICKED']: (state) => {
    // console.log('tokenReducer POLL_TICKED')
    return applyAutoTags(state)
  },
  ['@userSecurity/token/removed']: (state) => {
    return {
      ...state,
      savedEventIds: [],
      savedTagIds: []
    }
  },
  [eventTypes.CONTENT_TAGS_SAVEDSTREAMS_RECEIVED]: (state, action: PayloadAction<number[]>) => {
    return {
      ...state,
      savedEventIds: action.payload || []
    }
  },
  [eventTypes.CONTENT_TAGS_SAVETAG_TOGGLED]: (state, action: PayloadAction<string>) => {
    if (!action.payload || action.payload === '') return state
    const payload = action.payload
    const newSavedList = addOrRemoveTag(state.savedTagIds, payload)
    const newState: ITagsState = { ...state, savedTagIds: newSavedList }
    return newState
  },
  [eventTypes.CONTENT_TAGS_SAVESTREAM_TOGGLED]: (state, action: PayloadAction<number>) => {
    if (!action.payload) return state
    const payload = action.payload
    const newSavedList = addOrRemoveStream(state.savedEventIds, payload)
    const newState: ITagsState = { ...state, savedEventIds: newSavedList }
    return newState
  },
  [eventTypes.CONTENT_TAGS_RECEIVED]: (state, action: PayloadAction<ITagsResponse>) => {
    const tree = action.payload.tree
    const pathIndex: ITagIndex[] = []
    const uuidIndex: ITagIndex[] = []
    buildIndexes('', undefined, tree, pathIndex, uuidIndex)
    const browseAll = buildBrowseAll(tree || [], state.streams || [], uuidIndex)
    const browseFiltered = buildBrowseFiltered(browseAll, state.filters, state.filterSearchTerm)
    const result = {
      ...state,
      tree,
      browseAll,
      browseFiltered,
      streams: setStreamTags(_.cloneDeep(state.streams), state.uuidIndex),
      pathIndex,
      uuidIndex,
      error: '',
      errorDescription: '',
      hasLoadedTags: true
    }
    return result
  },
  [eventTypes.CONTENT_TAGS_STREAMS_RECEIVED]: (state, action: PayloadAction<IStreamsResponse>) => {
    let streams = action.payload.streams
    const tempStreams: IStream[] = []
    // const tempDateLimit = new Date(2020, 1, 1)
    const tempDateLimit = new Date(1900, 1, 1)
    streams?.forEach(stream => {
      if (moment(stream.startTime) > moment(tempDateLimit)) tempStreams.push(stream)
    })
    streams = tempStreams
    const browseAll = buildBrowseAll(state.tree || [], streams || [], _.cloneDeep(state.uuidIndex))
    const browseFiltered = buildBrowseFiltered(state.browseAll, state.filters, state.filterSearchTerm)
    return applyAutoTags({
      ...state,
      hasLoadedStreams: true,
      browseAll,
      browseFiltered,
      streams: setStreamTags(streams, state.uuidIndex)
    })
  },
  [eventTypes.CONTENT_TAGS_FILTER_SELECTED]: (state, action: PayloadAction<string>) => {
    // let filters = state.filters.includes(action.payload) ? [...state.filters] : [...state.filters, action.payload]
    const uuidIndex = _.cloneDeep(state.uuidIndex)
    let filters = [...state.filters]

    //filters.push(action.payload)
    let tagIndex: ITagIndex = _.find(uuidIndex, (ti) => ti.index === action.payload)
    if (tagIndex && tagIndex.tag && tagIndex.tag.children && tagIndex.tag.children.length > 0) {
      tagIndex.tag.children.forEach(child => {
        if (!state.filters.includes(child.id)) {
          if (!state.filters.includes(action.payload)) {
            filters.push(child.id)
          }
        }
      })
    } else {
      if (!state.filters.includes(action.payload)) {
        filters.push(action.payload)

      }
    }


    const payload = action.payload
    // filters = removePeers(payload, filters, uuidIndex)
    const browseFiltered = buildBrowseFiltered(state.browseAll, filters, state.filterSearchTerm)

    return {
      ...state,
      browseFiltered,
      filters
    }
  },
  [ROUTER_LOCATION_CHANGE]: (state, action: PayloadAction<string>) => {
    // Preserve filter, Jess request (undo here)
    // const browseFiltered = buildBrowseFiltered(state.browseAll, [], state.filterSearchTerm)
    return {
      ...state,
      //browseFiltered,
      // filters: []
    }
  },
  [eventTypes.CONTENT_TAGS_FILTER_REMOVED]: (state, action: PayloadAction<string>) => {
    const browseFiltered = buildBrowseFiltered(state.browseAll, [], state.filterSearchTerm)
    return {
      ...state,
      browseFiltered,
      filters: []
    }
  },
  [eventTypes.CONTENT_TAGS_FILTER_SEARCH_SELECTED]: (state, action: PayloadAction<string>) => {
    /*const tree = _.cloneDeep(state.tree);
    const tags = findFilterTag(tree);
    const searchTag = tags[0];

    const filterTags = tags.filter(tag => {
      return _.includes(tag.name.toLowerCase(), action.payload.toLowerCase())
    }
    );
    const filters: ITag[] = [];
    searchTag.name = action.payload
    filters.push(searchTag)
    searchTag.children = filterTags*/
    const browseFiltered = buildBrowseFiltered(state.browseAll, [], action.payload)
    return {
      ...state,
      browseFiltered,
      filterSearchTerm: action.payload,
    }
  },
  [eventTypes.CONTENT_TAGS_FILTER_SEARCH_REMOVED]: (state, action: PayloadAction<string>) => {
    const browseFiltered = buildBrowseFiltered(state.browseAll, [], '')
    return {
      ...state,
      browseFiltered,
      filterSearchTerm: ''
    }
  }
})


export default tokenReducer
