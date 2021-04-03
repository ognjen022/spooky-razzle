import { eventGroups } from '../../eventGroups'

const moduleName = '@content'
const sectionName = 'tags'

export const CONTENT_TAGS_REQUESTED = `${moduleName}/${sectionName}/${eventGroups.REQUESTED}`
export const CONTENT_TAGS_RECEIVED = `${moduleName}/${sectionName}/${eventGroups.RECEIVED}`
export const CONTENT_TAGS_ERRORED = `${moduleName}/${sectionName}/${eventGroups.ERRORED}`
export const CONTENT_TAGS_FILTER_SELECTED = `${moduleName}/${sectionName}/filter/${eventGroups.SELECTED}`
export const CONTENT_TAGS_FILTER_REMOVED = `${moduleName}/${sectionName}/filter/${eventGroups.REMOVED}`
export const CONTENT_TAGS_FILTER_SEARCH_SELECTED = `${moduleName}/${sectionName}/filterSearch/${eventGroups.SELECTED}`
export const CONTENT_TAGS_FILTER_SEARCH_REMOVED = `${moduleName}/${sectionName}/filterSearch/${eventGroups.REMOVED}`
export const CONTENT_TAGS_STREAMS_RECEIVED = `${moduleName}/${sectionName}/streams/${eventGroups.RECEIVED}`
export const CONTENT_TAGS_STREAMS_ERRORED = `${moduleName}/${sectionName}/streams/${eventGroups.ERRORED}`
export const CONTENT_TAGS_SAVETAG_TOGGLED = `${moduleName}/${sectionName}/savetag/${eventGroups.TOGGLED}`
export const CONTENT_TAGS_SAVESTREAM_TOGGLED = `${moduleName}/${sectionName}/savestream/${eventGroups.TOGGLED}`
export const CONTENT_TAGS_SAVEDSTREAMS_RECEIVED = `${moduleName}/${sectionName}/savedstreams/${eventGroups.RECEIVED}`
export const CONTENT_TAGS_SAVEDTAGS_RECEIVED = `${moduleName}/${sectionName}/savedtags/${eventGroups.RECEIVED}`


