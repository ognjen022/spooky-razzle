import React from 'react'
import { isMobile } from '../../utils/utils';
import styles from './Modal.module.scss'
import classNames from 'classnames';

export enum ModalSize {
  lg ='lg',
  md = 'md',
  sm = 'sm'
}

interface ModalProps {
  display: boolean;
  handleCloseModal: Function;
  modalSize?: ModalSize
}

const Modal: React.FC<ModalProps> = ({ display, children, handleCloseModal, modalSize }) => {

  const close = () => {
    handleCloseModal();
  }
  const contentClasses = classNames(
    styles.modal__content,
    styles[`modal__content--${isMobile() ? '' : modalSize}`]
  )
  return (
    <div className={`${styles['modal']} ${display ? styles['is-active'] : ''}`}>
      {/* <div onClick={(e) => console.log(e)} className={styles['modal__background']}></div> */}
      <div onMouseDown={close} className={styles['modal__inner']}>
        <div className={contentClasses}>
          <button onClick={close} className={`${styles['modal__close-button']} ${styles['js-toggle-modal']}`}>
            <svg className='icon' role='presentation'>
              <use xlinkHref='#icon-mini-close'></use>
            </svg>
            <span className='screen-reader-text'>Close</span>
          </button>
          {
            display &&
              children
          }
        </div>
      </div>
    </div>
  )
}

export default Modal