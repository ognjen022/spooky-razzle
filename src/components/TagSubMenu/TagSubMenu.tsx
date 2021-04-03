import React from 'react'

import styles from './TagSubMenu.module.scss'

export interface ITagItems {
	href: string;
	text: string;
}

interface ITagSubMenuProps {
	name: string;
	items: ITagItems[]
}

const TagSubMenu: React.FC<ITagSubMenuProps> = (props) => {

	const renderItems = (items: ITagItems[]) => {
		return items.map(item => (
			<li key={`${item.href}-${item.text}`} className={styles['sub-menu-nav__list-item']}>
				<a href={item.href} className={styles['sub-menu-nav__link']}>{item.text}</a>
			</li>
		))
	}

	return (
		<div className={styles['sub-menu']} id="top">
			<div className={styles['container']}>
				<strong className={styles['sub-menu__title']}>{props.name}</strong>
				<nav className={styles['sub-menu-nav']}>
					<ul className={styles['sub-menu-nav__list']}>
						<>
							{props.items && renderItems(props.items)}
						</>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default TagSubMenu
