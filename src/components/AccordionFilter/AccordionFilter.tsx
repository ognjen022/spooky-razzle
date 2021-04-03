import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import styles from './AccordionFilter.module.scss'

import { RootState } from '../../services/RootState'
import { IContentState } from '../../services/content/IContentState'
import { ITag, BrowseOption, BrowseResult } from '../../services/content/tags/models'

interface IAccordionFilterProps {
  option: BrowseOption
  filters: string[]
  onSelect: (item: BrowseResult) => void
}

const AccordionFilter: React.FC<IAccordionFilterProps> = (props) => {
  const { filters, option, onSelect } = props

  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<BrowseResult | null>(null);

  const handleChildrenVisibility = () => {
    setIsMenuExpanded(!isMenuExpanded)
  }

  const handleSelectedItem = (item: BrowseResult) => {
    setSelectedOption(item)
    onSelect(item)
    setIsMenuExpanded(false)
  }


  const displayBold = (): boolean => {
    let result = false

    option.items.forEach((val: BrowseResult) => {
      if (filters.includes(val.tagId)) result = true
    })

    return result
  }

  const displayLabel = (): string => {

    if (filters.includes(option.tagId)) return option.name

    let result = ''
    let includesCount = 0
    option.items.forEach((val: BrowseResult) => {
      if (filters.includes(val.tagId)) {
        result = val.name
        includesCount += 1
      }
    })

    if (includesCount === 1) return result

    return option.name
  }

  const isOpenClass = isMenuExpanded ? styles['accordion-filter__is-open'] : '';
  const isValueSelected = selectedOption ? styles['accordion-filter__is-selected'] : '';

  return (
    <div className={`${styles['accordion-filter']}`} >
      <button
        tabIndex={0}
        className={`${styles['accordion-filter__header']} ${isOpenClass} ${isValueSelected}  ${displayBold() && styles['accordion-filter-highlight']}`}
        onClick={handleChildrenVisibility}
      >
        <div className={styles['accordion-filter__padding']}>
          {
            displayLabel()
          }
        </div>
      </button>

      <div className={styles['accordion-filter__items-group']} style={{ display: isMenuExpanded ? 'block' : 'none' }}>
        {
          option.items?.length > 0 && option.items.map(item => item.showInAccordion && (
            <button
              key={uuidv4()}
              className={styles['accordion-filter__item']}
              onClick={() => handleSelectedItem(item)}
            >
              <div className={styles['accordion-filter__padding']}>{item.name}</div>
            </button>
          ))
        }
      </div>
    </div >
  )
}

export default AccordionFilter
