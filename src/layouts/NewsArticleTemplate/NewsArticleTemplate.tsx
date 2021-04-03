import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import { RootState } from '../../services/RootState'
import { INewsArticle } from '../../services/content/news/models'
import { selectNewsArticles, selectHasLoaded } from '../../services/content/news/selectors'
import { newsArticleRequestedEvent } from '../../services/content/news/events'

import Ticker from '../../components/Ticker/Ticker'

// import NewsLargeCarousel from '../../scenes/NewsLargeCarousel/NewsLargeCarousel'
// import NewsSmallCarousel from '../../scenes/NewsSmallCarousel/NewsSmallCarousel'
import NewsPostIntro from '../../scenes/NewsPostIntro/NewsPostIntro'
// import NewsPost from '../../scenes/NewsPost/NewsPost'
import NewsPostImageCarousel from '../../scenes/NewsPostImageCarousel/NewsPostImageCarousel'
import NewsPostSimilar from '../../scenes/NewsPostSimilar/NewsPostSimilar'
// import NewsCopyHero from '../../scenes/NewsCopyHero/NewsCopyHero'
import Spinner from '../../components/Spinner/Spinner'

export interface INewsArticleTemplateProps {}

// const getTicker = (mainTag: ITag | undefined): ITicker | undefined => {
//   if (!mainTag || !mainTag.ticker || mainTag.ticker.length === 0) return undefined
//   return mainTag.ticker[0]
// }

const NewsArticleTemplate: React.FC<INewsArticleTemplateProps> = props => {
  const dispatch = useDispatch()
  const { title }: any = useParams()
  const newsTitle: any = title

  // Selector data page needs from state
  const newsArticles = useSelector<RootState, INewsArticle[]>(state => selectNewsArticles(state))
  // const currentNewsArticle = useSelector<RootState, INewsArticle>(state => selectCurrentArticles(state))
  const currentNewsArticle = useSelector<RootState, INewsArticle | undefined>(state => state.content.news.currentNewsArticle)

  let hasLoaded = useSelector<RootState, boolean>(state => selectHasLoaded(state))

  useEffect(() => {
    window.scrollTo(0, 0)
    newsTitle && dispatch(newsArticleRequestedEvent(newsTitle.replace(/_/g, ' ')))
  }, [dispatch, newsTitle])

  if (!hasLoaded)
    return (
      <div className="container">
        <Spinner />
      </div>
    )

  return (
    <section>
      {currentNewsArticle ? (
        <>
          <NewsPostIntro article={currentNewsArticle} />

          {/* TODO - Display article images when article.carousel images */}
          <NewsPostImageCarousel articles={newsArticles} />

          {/* <NewsPost content={<>
            <p>
              Congue dictum taciti, vivamus hac feugiat facilisis quis dictum dapibus potenti eget. Vitae. Nullam porta mauris ante ridiculus.
              In, nostra lectus. Eu ac in bibendum hymenaeos donec metus semper arcu. Blandit malesuada diam nostra. Per sed. Laoreet lobortis 
              Eu pharetra lectus vehicula. Pellentesque metus tellus. Risus lectus, eget ultricies id hymenaeos parturient non lectus erat enim 
              vestibulum auctor orci lorem blandit.
            </p>
            <p>
              Libero curae;. Conubia dignissim at, metus. Nam integer montes venenatis. Ultricies integer magnis maecenas per cras fusce dis 
              ultricies penatibus nec. Dui libero consequat Nascetur odio facilisi vestibulum ornare aliquam interdum, rutrum vitae dapibus 
              ligula ac habitant pharetra porttitor massa nibh elit Magnis ullamcorper lectus, primis quam aliquam Leo auctor metus primis erat. 
              Libero, donec vehicula ultricies posuere nulla habitasse cubilia fusce sodales habitasse non dolor vivamus porta. Pede lacus volutpat 
              tempor enim et dis.
            </p>
          </>} /> */}

          {/* TODO - work on similar articles logic around tags? - currently displaying all articles */}
          <NewsPostSimilar articles={newsArticles} />

          {/* <NewsPost content={
            <p>
              Luctus habitasse nibh eros vestibulum ad augue elit hendrerit sociosqu accumsan nunc per molestie. Dignissim conubia. Ornare hendrerit 
              magnis elit senectus tellus maecenas, suspendisse massa nisi sociis metus amet fusce porttitor per duis quisque molestie ullamcorper 
              sollicitudin maecenas sociosqu tellus volutpat enim pretium massa ridiculus varius tempus adipiscing curae; quisque class mi Turpis dictum 
              adipiscing ac auctor volutpat quisque nullam cum morbi pretium commodo.
          </p>} /> */}
        </>
      ) : (
        <div className="container">
          News Article not found. Click{' '}
          <Link to="/news" style={{ textDecoration: 'underline' }}>
            here
          </Link>{' '}
          to go back to news page.
        </div>
      )}
    </section>
  )
}

const defaultProps: INewsArticleTemplateProps = {
  article: undefined
}

NewsArticleTemplate.defaultProps = defaultProps

export default NewsArticleTemplate
