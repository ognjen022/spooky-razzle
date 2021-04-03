import React from 'react';
import { IStream, ITag } from '../../services/content/tags/models'
import { getInitials } from '../../utils/utils'

interface LineUpIconProps {
  stream: IStream
  className: string
  orderNumber: number
  lineUpTagsFull: ITag[]
}
const LineUpIcon: React.FC<LineUpIconProps> = ({ stream, className, orderNumber, lineUpTagsFull }) => {

  if (!stream || !lineUpTagsFull || lineUpTagsFull.length < 2) return <></>

  return (
    <div className={className}>
      {lineUpTagsFull[orderNumber].icon ?
        <img /*className="lazyload" data-*/ src={lineUpTagsFull[orderNumber].icon}
          alt=""
        /> : <span>{getInitials(lineUpTagsFull[orderNumber].name)}</span>
      }
    </div>
  )
}

export default LineUpIcon