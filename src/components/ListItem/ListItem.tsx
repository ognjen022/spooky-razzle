import React from 'react';

import styles from './ListItem.module.scss';

interface IFeaturesProps {
    number: string | undefined;
    shortText: string[];
    longText: string | undefined
}

const ListItem: React.FC<IFeaturesProps> = (props: IFeaturesProps) => {


    return (
        <>
            <div className={styles['list-item']}>
                <div className={styles['list-item__number']}>
                    <span className={styles['label']}>{props.number}</span>
                </div>

                <div className={styles['list-item__short-text']}>
                    <p>
                        {props.shortText.map(item => <>{item}<br /></> )}  
                        
                    </p>
                </div>

                <div className={styles['list-item__long-text']}>
                    <p>{props.longText}</p>
                </div>
            </div>

        </>
    )
}

export default ListItem