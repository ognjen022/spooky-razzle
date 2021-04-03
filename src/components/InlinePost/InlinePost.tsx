import React, { useState } from 'react'

import styles from './InlinePost.module.scss'

interface IInlinePostProps {
	active?: boolean;
	title: string;
	children: React.ReactNode;
}

const InlinePost: React.FC<IInlinePostProps> = (props) => {

	const [active, setActive] = useState<boolean>(props.active || false)

	const handleToggle = () => {
		setActive(!active);
	}

	const isActiveStyle = active ? styles['is-active'] : '';

	return (
		<div className={styles['inline-post']}>
			<div className={styles['inline-post__header']}>
				<h2>{props.title}</h2>
				<button className={`${styles['inline-post__button']} ${isActiveStyle}`} onClick={handleToggle}>
					<svg className="icon" role="presentation">
						<use xlinkHref="#icon-chevron-down"></use>
					</svg>
					<span className="screen-reader-text">Toggle</span>
				</button>
			</div>
			<div className={`${styles['inline-post__content']} ${isActiveStyle}`}>
				<div className={styles['inline-post__content-inner']}>
					{props.children}
				</div>
			</div>
		</div>
	)
}

export default InlinePost
