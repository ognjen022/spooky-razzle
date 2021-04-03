import { eventGroups } from '../../eventGroups'

const moduleName = '@content'
const sectionName = 'videoPlayer'

export const CONTENT_VIDEO_PLAYER_TOKEN_REQUESTED = `${moduleName}/${sectionName}/token/${eventGroups.REQUESTED}`
export const CONTENT_VIDEO_PLAYER_TOKEN_RECEIVED = `${moduleName}/${sectionName}/token/${eventGroups.RECEIVED}`
export const CONTENT_VIDEO_PLAYER_TOKEN_ERRORED = `${moduleName}/${sectionName}/token/${eventGroups.ERRORED}`
export const CONTENT_VIDEO_PLAYER_STREAM_REQUESTED = `${moduleName}/${sectionName}/stream/${eventGroups.REQUESTED}`
export const CONTENT_VIDEO_PLAYER_STREAM_RECEIVED = `${moduleName}/${sectionName}/stream/${eventGroups.RECEIVED}`
export const CONTENT_VIDEO_PLAYER_STREAM_ERRORED = `${moduleName}/${sectionName}/stream/${eventGroups.ERRORED}`


