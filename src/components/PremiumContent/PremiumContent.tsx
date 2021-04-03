import React from 'react';
import { IStream } from '../../services/content/tags/models'

interface PremiumContentProps {
  stream: IStream
  className: string
}
const PremiumContent: React.FC<PremiumContentProps> = ({ stream, className }) => {
  return (
    <>
      <svg className={className} role="presentation">
        <use xlinkHref={stream?.isFreeToWatch ? "#icon-purchased" : "#icon-premium"}></use>
      </svg>
      <span>{stream?.isFreeToWatch ? 'Free' : 'Premium'}</span>
    </>
  )
}

export default PremiumContent