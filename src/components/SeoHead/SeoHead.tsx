import React from 'react'
import { Helmet } from 'react-helmet'
import { ITag } from '../../services/content/tags/models'

interface ISeoHead {
  readonly title: string
  readonly metaDescription: string
  readonly ogTitle: string
  readonly ogDescription: string
  readonly ogImage: string
}

const SeoHead: React.FC<ISeoHead> = (props) => {
  const { title, metaDescription, ogTitle, ogDescription, ogImage } = props

  const upperCaseFirst = (value: string) => {
    if (!value || value.length === 0) return ''
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return (
    <Helmet>
      <title>{upperCaseFirst(title)} | Sideline.Live</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={ogTitle} />
      <meta name="og:description" content={ogDescription} />
      <meta name="og:image" content={ogImage} />
    </Helmet>
  )
}

export default SeoHead
