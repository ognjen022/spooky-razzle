import React from 'react'

import styles from './AccountWelcome.module.scss'

interface IAccountWelcomeProps {
	name: string;
}

const AccountWelcome: React.FC<IAccountWelcomeProps> = (props) => {

	const firstName = props.name.split(" ")[0];
	const greeting = props.name ? `Kia'ora ${firstName}.` : `Kia'ora.`

	return (
		<section>
			<div className="container">
				<div className={styles['account-welcome']}>
					<div className={styles['account-welcome__text']}>
						<h2>{greeting}</h2>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AccountWelcome
