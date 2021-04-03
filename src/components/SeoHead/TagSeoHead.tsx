import React from 'react'
import { ITag } from '../../services/content/tags/models'
import SeoHead from './SeoHead'

interface ITagSeoHead {
  readonly mainTag: ITag
}

const TagSeoHead: React.FC<ITagSeoHead> = (props) => {
  const { mainTag } = props
  if (!mainTag) return <></>
  return (
    <SeoHead
      metaDescription={mainTag.metaDescription || mainTag.description}
      title={mainTag.seoTitle || mainTag.name}
      ogDescription={(mainTag.metaDescription || mainTag.description) || mainTag.ogDescription || '' }
      ogTitle={mainTag.ogTitle || mainTag.name}
      ogImage={mainTag.ogImage || mainTag.image || mainTag.icon || ''}
    />
  )
}

export default TagSeoHead
