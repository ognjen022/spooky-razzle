import React from 'react';
import styles from './Banner.module.scss'

interface IBannerProps {
    text: string | undefined
}
const Banner: React.FC<IBannerProps> = (props: IBannerProps) => {

    return (
        <div className={styles['banner']}>
            {props.text}
        </div>
    )
}

export default Banner