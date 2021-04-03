import React from 'react'

const styles = {
  display: "flex",
}

const iconStyles = {
  width: "4em",
  height: "4em",
  margin: "auto"
}

const Spinner: React.FC = () => {
  return (
    <div style={styles}>
      <svg style={iconStyles} className="icon icon-loading" role="presentation">
        <use xlinkHref="#icon-loading"></use>
      </svg>
    </div>
  )
}

export default Spinner