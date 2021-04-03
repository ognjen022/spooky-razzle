import React, { useState } from 'react'
import DOMPurify from 'dompurify'

import styles from './InlinePost.module.scss'

interface IInlinePostGroupProps {
  data: any[]
}

interface IPost {
  active?: boolean;
  title: string;
  children: React.ReactNode;
}

const InlinePostGroup: React.FC<IInlinePostGroupProps> = (props: IInlinePostGroupProps) => {

  const { data } = props;
  const [active, setActive] = useState<number | undefined>(undefined);
  const isActive = (index) => {
	 return index === active ? styles['is-active'] : '';
  }
  return (
    <>
	  {data.map((item, index) => 
		<div className={styles['inline-post-new']}>
          <div className={styles['inline-post-new__header']} onClick={() => setActive(index)}>
		    <p>{item.question}</p>
			<button className={`${styles['inline-post-new__button']} ${isActive(index)}`} onClick={()=> setActive(index)}>
			  <svg className={`${styles['inline-post-new__icon']} icon`} role="presentation">
				<use xlinkHref="#icon-close"></use>
			  </svg>
			  <span className="screen-reader-text">Toggle</span>
			</button>
		  </div>
		  <div className={`${styles['inline-post-new__content']} ${isActive(index)}`}>
			  <p className={styles['inline-post-new__content-inner']}>
				
			  	<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.answer) }} />
			  </p>
		  </div>
		</div>
		)}	
	</>
  )

}

export default InlinePostGroup
