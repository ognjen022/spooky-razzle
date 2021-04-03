import { INewsArticle } from './models'
import { RootState } from '../../RootState'


export const selectNewsArticles = (state: RootState): INewsArticle[] => state.content?.news?.newsMetaData || []

export const selectHasLoaded = (state: RootState): boolean =>
    state.content.news.hasLoadedNews && state.content.news.hasLoadedNews