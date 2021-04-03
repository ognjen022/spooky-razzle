import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../services/RootState'
import { INewsArticle } from '../../services/content/news/models'
import { selectNewsArticles, selectHasLoaded } from '../../services/content/news/selectors'

import Ticker from '../../components/Ticker/Ticker'
import { ITag, IStream, ITicker, ITagIndex } from '../../services/content/tags/models'
import { selectMainTag } from '../../services/content/tags/selectors'
import { newsRequestedEvent } from '../../services/content/news/events'

import NewsLargeCarousel from '../../scenes/NewsLargeCarousel/NewsLargeCarousel'
import NewsSmallCarousel from '../../scenes/NewsSmallCarousel/NewsSmallCarousel'
import NewsPostIntro from '../../scenes/NewsPostIntro/NewsPostIntro'
import NewsPost from '../../scenes/NewsPost/NewsPost'
import NewsPostImageCarousel from '../../scenes/NewsPostImageCarousel/NewsPostImageCarousel'
import NewsPostSimilar from '../../scenes/NewsPostSimilar/NewsPostSimilar'
import NewsCopyHero from '../../scenes/NewsCopyHero/NewsCopyHero'
import CopyStatement from '../../components/CopyStatement/CopyStatement'
import Spinner from '../../components/Spinner/Spinner'

export interface INewsTemplateProps {
  readonly mainTag: ITag
}

const getTicker = (mainTag: ITag | undefined): ITicker | undefined => {
  if (!mainTag || !mainTag.ticker || mainTag.ticker.length === 0) return undefined
  return mainTag.ticker[0]
}

const NewsTemplate: React.FC<INewsTemplateProps> = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(newsRequestedEvent());
  }, [])

  // Selector data page needs from state
  const newsArticles = useSelector<RootState, INewsArticle[]>(state => selectNewsArticles(state))
  let hasLoaded = useSelector<RootState, boolean>(state => selectHasLoaded(state))
  const mainTag = useSelector<RootState, ITag | undefined>(state => selectMainTag(state))

  if (!hasLoaded) return (
    <div className="container">
      <Spinner />
    </div>
  )

  const ticker: ITicker | undefined = getTicker(mainTag)

  const featureArticles = newsArticles.length > 0 && newsArticles.filter(article => article.featuredArticle)

  // TODO - feature article logic
  const featureArticleOne = featureArticles && featureArticles.length > 0
    ? featureArticles[0] // take first feature article
    : newsArticles[0] // fallback to first article if no feature articles exists

  const featureArticleTwo = featureArticles && featureArticles.length > 0
    ? featureArticles[1] // take first feature article
    : newsArticles[1] // fallback to first article if no feature articles exists

  return (
    <section>
      {/* Ticker */}
      {/* {ticker && ticker.tickerMessage &&
        <Ticker text={ticker.tickerMessage.toUpperCase()} />
      } */}
      <Ticker text={'ticker message'} link={undefined} />

      {newsArticles.length > 0 ? (
        <>
          {/* NewsSmallCarousel */}
          <NewsSmallCarousel featureArticle={featureArticleOne} />

          {/* NewsCopyHero: */}
          <NewsCopyHero articles={newsArticles.slice(0, 2)} />

          {/* NewsLargeCarousel: */}
          <NewsLargeCarousel featureArticle={featureArticleTwo} />
        </>
      ) : (
          <div className="container">No news acticles is available.</div>
        )}

      {/* Copy Statement */}
      <CopyStatement mainTag={mainTag} parentTag={undefined} copyStatementIndex={0} />

      {/* <NewsSmallCarousel />

      <NewsCopyHero />

      <NewsLargeCarousel /> */}
    </section>
  )
}

export default NewsTemplate
