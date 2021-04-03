import { IVideoPlayerState } from './videoPlayer/models';
import { ITagsState } from './tags/models'
import { INewsState } from './news/models'
// import { StreamsState } from './streams/models'
// import { BlogsState } from './blogs/models'

export interface IContentState {
  readonly tags: ITagsState
  readonly news: INewsState
  readonly videoPlayer: IVideoPlayerState
  // readonly streams: StreamsState
  // readonly blogs: BlogsState
}
