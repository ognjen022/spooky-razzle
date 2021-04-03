export interface ITagsState {
  readonly tree: ITag[] | undefined
  // readonly filteredTree: ITag[] | undefined
  readonly browseAll: BrowseOption[],
  readonly browseFiltered: BrowseOption[]
  readonly filters: string[]
  readonly streams: IStream[] | undefined
  readonly pathIndex: ITagIndex[] | undefined
  readonly uuidIndex: ITagIndex[] | undefined
  readonly mainTag: string | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
  readonly hasLoadedTags: boolean
  readonly hasLoadedStreams: boolean
  readonly savedEventIds: number[]
  readonly savedTagIds: string[]
  readonly filterSearchTerm: string
  readonly refreshKey: string
  readonly visitedTags: any[];
}

export interface ITagIndex {
  readonly index: string | undefined
  readonly parentIndex: string | undefined
  readonly tag: ITag
}

export interface ITicker {
  readonly tickerMessage: string | undefined
  readonly tickerExpiryTime: Date | undefined
  readonly tickerLink: string | undefined
}

export interface ITag {
  readonly id: string
  name: string
  description: string
  readonly ticker: ITicker[] | undefined
  readonly image: string | undefined
  readonly templateName: string | undefined
  readonly secondaryTag1: string | undefined
  readonly secondaryTag2: string | undefined
  readonly secondaryTag3: string | undefined
  readonly secondaryTag4: string | undefined
  readonly secondaryTag5: string | undefined
  readonly secondaryTag6: string | undefined
  readonly secondaryTag7: string | undefined
  readonly secondaryTag8: string | undefined
  readonly secondaryTag9: string | undefined
  readonly secondaryTag10: string | undefined
  readonly seoTitle: string | undefined
  readonly metaDescription: string | undefined
  readonly ogImage: string | undefined
  readonly ogTitle: string | undefined
  readonly ogDescription: string | undefined
  readonly icon: string | undefined
  readonly facebookLink: string | undefined
  readonly pricing: number | undefined
  readonly hideFromBrowse: boolean
  readonly twitterLink: string | undefined
  readonly instagramLink: string | undefined
  readonly stripeProductId: string | undefined
  children: ITag[] | undefined
  parent: ITag | undefined
  path: string | undefined
  copyStatement: ICopyStatement[] | undefined
  streamCount: number
  freeToWatch?: boolean | undefined
}

export interface ICopyStatement {
  readonly copyStatementText: string | undefined
  readonly copyStatementLink: ICopyStatementLink | undefined
}

export interface ICopyStatementLink {
  readonly name: string | undefined
  readonly target: string | undefined
  readonly type: string | undefined
  readonly url: string | undefined
}

export interface ITagsResponse {
  readonly tree: ITag[] | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
}


export interface IStreamsResponse {
  readonly streams: IStream[] | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
}

export interface BrowseOption {
  name: string
  path: string
  items: BrowseResult[]
  tagId: string
  parentTagId: string
  relatedTagIds: string[]
}

export interface BrowseResult {
  name: string
  path: string
  tagId: string
  parentTagId: string
  children: BrowseResult[]
  relatedTagIds: string[]
  showInAccordion: boolean // only show top level items in the Accordion, but everything else in browse results
}

export interface IStream {
  name: string
  readonly description: string
  readonly image: string
  readonly directions: string
  readonly eventId: number
  readonly isFreeToWatch: boolean
  readonly startTime: Date
  readonly duration: number
  readonly streamRestricted: boolean
  browseTags: string[]
  readonly lineUpTags: string[]
  readonly teamA: string
  readonly teamB: string
  readonly ticker: string
  readonly videoStreams: VideoStream[]
}

export interface VideoStream {
  readonly streamName: string
  // readonly streamEmbed: string
  readonly liveStreamEventId: string
  readonly liveEventVideoId: number
  readonly previewImage: string
  readonly tractracSource: string
  readonly streamType: StreamTypes
}

export enum VideoStreamStatus {
  Purchased,
  NotPurchased,
  NotPurchasedNotLoggedIn,
  Free,
  FreeNotLoggedIn
}

export enum StreamTypes {
  TracTracStream = 'TracTracStream',
  MatchStream = 'MatchStream'
}