import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'debounce-promise';
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import TagManager from 'react-gtm-module'

import { RootState } from '../../services/RootState'
import { IContentState } from '../../services/content/IContentState'
import { ITagsState, BrowseOption, BrowseResult } from '../../services/content/tags/models'
import { ITag } from '../../services/content/tags/models'
import SeoHead from '../../components/SeoHead/SeoHead'

import styles from './Browse.module.scss'

import { tagsFilterSelectedEvent, tagsFilterRemovedEvent, tagsFilterSearchTermSelectedEvent, tagsFilterSearchTermRemovedEvent } from '../../services/content/tags/events'

import AccordionFilter from '../../components/AccordionFilter/AccordionFilter'

const Browse = () => {
  const dispatch = useDispatch()
  const hasFilter = useSelector<RootState, boolean>((state: RootState) => state.content.tags.filters.length > 0)
  const filters = useSelector<RootState, string[]>((state: RootState) => state.content.tags.filters)
  const browseFiltered: BrowseOption[] = useSelector<RootState, BrowseOption[]>((state: RootState) => state.content.tags.browseFiltered)

  const [searchValue, setSearchValue] = useState<string>('');
  const [resultsFor, setResultsFor] = useState<string>('');

  const handleFormSubmit = (e) => {
    // ('handleFormSubmit searchValue.toLowerCase()', searchValue.toLowerCase())
    e.preventDefault();
    dispatch(tagsFilterSearchTermSelectedEvent(searchValue.toLowerCase()));
  }

  const handleFilterSelect = (item: BrowseResult) => {
    dispatch(tagsFilterSelectedEvent(item.tagId))
  }

  const handleFilterRemove = () => {
    // Clear redux accordion filters
    dispatch(tagsFilterRemovedEvent())
    // Clear redux search term store
    dispatch(tagsFilterSearchTermRemovedEvent())
    // Clear search
    setSearchValue('')
    setResultsFor('')
  }

  const dispatchSearch = (searchTerm: string) => {
    const search = searchTerm.trim().toLocaleLowerCase();
    dispatch(tagsFilterSearchTermSelectedEvent(search));
    setResultsFor(search)
  };

  const debounceDispatchSearch = useCallback(debounce(dispatchSearch, 200), []);

  const onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    if (value === '' || value === undefined) {
      handleFilterRemove()
    } else {
      setSearchValue(value)
      debounceDispatchSearch(value)
      if (value === '') dispatchSearch(value)
    }
  }

  let userId = useSelector<RootState, string | undefined>((state) => state.userSecurity.profile?.id || undefined)

  /*TagManager.dataLayer({
    dataLayer: {
      userId,
      userProject: 'Sideline Live',
      page: `/browse`
    },
    dataLayerName: 'PageDataLayer'
  })*/

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section>
      <SeoHead metaDescription={'Browse'} ogDescription={'Browse'} ogImage={''} ogTitle={'Browse'} title={'Browse'} />
      <div className="container">
        <div className={styles.browse}>
          <aside className={styles['browse__aside']}>
            <h1 className={styles['browse__title']}>Search & filter</h1>
            <div className={styles['browse__filters-container']}>

              <div className={styles['browse__filters-input']}>
                <form onSubmit={handleFormSubmit}>
                  <input
                    value={searchValue}
                    type="search"
                    placeholder="Search..."
                    className={styles['browse__filters-search']}
                    onChange={onSearchTermChange}
                  />
                  <button type="submit" className={styles['browse__filters-search-button']}>
                    <svg className="icon" role="presentation">
                      <use xlinkHref="#icon-search"></use>
                    </svg>
                    <span className="screen-reader-text">Search</span>
                  </button>
                </form>
              </div>
              <div className={styles['browse__filters-heading']}>
                <span>Filter by</span>
                <button className={hasFilter ? styles['browse__clear-bold'] : styles['browse__clear']} onClick={handleFilterRemove}>Clear</button>
              </div>

              {browseFiltered.map(browseOption => (
                <AccordionFilter key={uuidv4()} option={browseOption} filters={filters} onSelect={handleFilterSelect} />
              ))}

            </div>
          </aside>
          <div className={styles['browse__content']}>
            <h1 className={styles['browse__title']}>
              Results
              {resultsFor.length > 0 && <span className={styles['browse__results-for']}> ({resultsFor})</span>}
            </h1>

            {browseFiltered.map(browseOption => (
              <div key={uuidv4()} className={styles['browse__category-results']}>
                <h2>
                  {browseOption.name}
                  {/*tags.filters?.length > 0 && tag?.children && selectedChild(tag?.children, filters) && selectedChild(tag?.children, filters)?.children && ' / '}
                  {tags.filters?.length > 0 && tag?.children && selectedChild(tag?.children, filters) && selectedChild(tag?.children, filters)?.children && <Link to={selectedChild(tag?.children, filters)?.path || '/browse'}>{selectedChild(tag?.children, filters)?.name}</Link>*/}
                </h2>
                <ul className={styles['browse__list-group']}>
                  <BrowseList results={browseOption.items} />
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Browse

interface IBrowseListProps {
  results: BrowseResult[]
  // filters: string[] | undefined
}


const BrowseList: React.FC<IBrowseListProps> = (props) => {
  const { results } = props

  return (
    <>
      {results.map(result => (
        <li key={uuidv4()}><Link to={result.path || '/browse'}>{result.name}</Link></li>
      ))}
    </>
  )
}
