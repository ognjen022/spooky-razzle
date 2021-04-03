import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface ILazyImageProps {
  readonly src: string | undefined
  readonly alt: string | undefined
}


const LazyImage: React.FC<ILazyImageProps> = (props) => {

  const { src, alt } = props
  const [id, setId] = useState(uuidv4())

  useEffect(() => {
    setId(uuidv4())
  }, [src])

  return (
    <img className={`lazyload reset-${id}`} data-src={src} alt={alt} />
  )
}

export default LazyImage
