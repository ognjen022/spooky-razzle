import React, { lazy, Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ITag } from '../../services/content/tags/models'
import { selectHasLoaded, selectMainTag } from '../../services/content/tags/selectors'
import { RootState } from '../../services/RootState'
import { selectIsLoggedIn } from '../../services/userSecurity/token/selectors'
const PageTemplate = lazy(() => import('../PageTemplate/PageTemplate'))
const LiveNowTemplate = lazy(() => import('../LiveNowTemplate/LiveNowTemplate'))
const UpcomingTemplate = lazy(() => import('../UpcomingTemplate/UpcomingTemplate'))
const LatestTemplate = lazy(() => import('../LatestTemplate/LatestTemplate'))
const TournamentTemplate = lazy(() => import('../TournamentTemplate/TournamentTemplate'))
const HomeTemplate = lazy(() => import('../HomeTemplate/HomeTemplate'))
const Spinner = lazy(() => import('../../components/Spinner/Spinner'))

enum templates {
  pagetemplate = 'pagetemplate',
  livenow = 'live-now',
  upcoming = 'upcoming',
  latest = 'latest',
  tournament = 'tournament',
  home = 'home'
}

const TemplateSwitch: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let mainTag: ITag | undefined = useSelector<RootState, ITag | undefined>(state => selectMainTag(state))
  let hasLoaded = useSelector<RootState, boolean>(state => selectHasLoaded(state))
  let isLoggedIn = useSelector<RootState, boolean>((state) => selectIsLoggedIn(state.userSecurity.token))
  let userId = useSelector<RootState, string | undefined>((state) => state.userSecurity.profile?.id || undefined)

  if (!hasLoaded) return (<></>) // todo: loading spinner

  /*TagManager.dataLayer({
    dataLayer: {
      userId,
      userProject: 'Sideline Live',
      page: mainTag?.path
    },
    dataLayerName: 'PageDataLayer'
  })*/

  switch (mainTag?.templateName) {
    case templates.livenow:
      return (
        <Suspense fallback={<Spinner />}>
          <LiveNowTemplate mainTag={mainTag} />
        </Suspense>
      )
    case templates.upcoming:
      return (
        <Suspense fallback={<Spinner />}>
          <UpcomingTemplate mainTag={mainTag} />
        </Suspense>
      )
    case templates.latest:
      return (
        <Suspense fallback={<Spinner />}>
          <LatestTemplate mainTag={mainTag} />
        </Suspense>
      )
    case templates.tournament:
      return (
        <Suspense fallback={<Spinner />}>
          <TournamentTemplate mainTag={mainTag} />
        </Suspense>
      )
    case templates.home:
      return (
        <Suspense fallback={<Spinner />}>
          <HomeTemplate mainTag={mainTag} />
        </Suspense>
      )
    default:
      return (
        <Suspense fallback={<Spinner />}>
          <PageTemplate /* mainTag={mainTag} */ />
        </Suspense>
      )
  }
}

export default TemplateSwitch
