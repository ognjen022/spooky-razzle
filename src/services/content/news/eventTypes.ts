import { eventGroups } from '../../eventGroups'

const moduleName = '@content'
const sectionName = 'news'

export const CONTENT_NEWS_REQUESTED = `${moduleName}/${sectionName}/${eventGroups.REQUESTED}`
export const CONTENT_NEWS_RECEIVED = `${moduleName}/${sectionName}/${eventGroups.RECEIVED}`
export const CONTENT_NEWS_ERRORED = `${moduleName}/${sectionName}/${eventGroups.ERRORED}`

export const CONTENT_NEWS_ARTICLE_REQUESTED = `${moduleName}/${sectionName}/article/${eventGroups.REQUESTED}`
export const CONTENT_NEWS_ARTICLE_RECEIVED = `${moduleName}/${sectionName}/article/${eventGroups.RECEIVED}`
export const CONTENT_NEWS_ARTICLE_ERRORED = `${moduleName}/${sectionName}/article/${eventGroups.ERRORED}`


