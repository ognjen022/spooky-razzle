export interface INewsState {
  newsMetaData: INewsArticle[] | undefined
  currentNewsArticle: INewsArticle | undefined
  error: string | undefined
  errorDescription: string | undefined,
  hasLoadedNews: boolean
}

export interface IRelatedLink {
  readonly caption: string | undefined
  readonly link: string | undefined
}

export interface ICarouselItem {
  readonly name: string | undefined
  readonly relatedLink: IRelatedLink | undefined
  readonly image: string | undefined
  readonly logo: string | undefined
  readonly text: string | undefined
  readonly video: string | undefined
}

export interface INewsArticle {
  name: string
  articleContent: string
  articlePreview: string
  carousel: ICarouselItem[] | undefined
  featuredArticle: string | undefined
  browseTags: string[] | undefined
}

export interface INewsMetaDataResponse {
  readonly newsMetaData: INewsArticle[] | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
}

export interface INewsArticleResponse {
  readonly newsArticle: INewsArticle | undefined
  readonly error: string | undefined
  readonly errorDescription: string | undefined
}

