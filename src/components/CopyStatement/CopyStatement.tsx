import React from 'react'

import styles from './CopyStatement.module.scss'

import LiveLogo from '../../svg/images/live-logo.svg'
import { ICopyStatement, ICopyStatementLink, ITag } from '../../services/content/tags/models'
import { Link } from 'react-router-dom'
import LazyImage from '../LazyImage/LazyImage'

interface ICopyStatementProps {
  mainTag: ITag | undefined,
  parentTag: ITag | undefined,
  copyStatementIndex: number
}

const CopyStatement: React.FC<ICopyStatementProps> = (props) => {

  const { mainTag, parentTag, copyStatementIndex } = props

  let copyStatementData: ICopyStatement | undefined = undefined
  if (mainTag && mainTag.copyStatement && mainTag.copyStatement.length >= copyStatementIndex + 1) {
    copyStatementData = mainTag.copyStatement[copyStatementIndex]
  } else if (parentTag && parentTag.copyStatement && parentTag.copyStatement.length >= copyStatementIndex + 1) {
    copyStatementData = parentTag.copyStatement[copyStatementIndex]
  }

  let linkText: string = 'WHETHER YOU’RE STREAMING EDUCATION OR SPORTS. WE’VE GOT YOU COVERED.'
  let linkUrl: string = '/'
  let isAbsoluteLink: boolean = false

  if (copyStatementData != undefined) {
    linkText = copyStatementData.copyStatementText || linkText
    linkUrl = copyStatementData.copyStatementLink?.url || linkUrl
    isAbsoluteLink = linkUrl.startsWith('https://') || linkUrl.startsWith('http://')
  }

  return (
    <div className="hide-medium">
      <section>
        <div className="container">
          <div className={styles['copy-statement']}>
            <div className={styles['copy-statement__image']}>
              <LazyImage src={LiveLogo} alt="Logo" />
            </div>
            <div className={styles['copy-statement__text']}>
              <h2>
                {
                  isAbsoluteLink &&
                  <a href={linkUrl}>{linkText}</a>
                }
                {
                  !isAbsoluteLink &&
                  <Link to={linkUrl}>
                    {linkText}
                  </Link>
                }
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CopyStatement
