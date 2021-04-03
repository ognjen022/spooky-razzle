import React from 'react'

// import styles from './LayoutDefault.module.scss'

export interface IDefaultLayoutProps {}

const LayoutDefault: React.FC<IDefaultLayoutProps> = (props) => {
  return <div>{props.children}</div>
}

export default LayoutDefault
