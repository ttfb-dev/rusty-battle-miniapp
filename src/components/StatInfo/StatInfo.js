import React from 'react'

import './StatInfo.css'

export const StatInfo = ({
  icon,
  value,
  aditionValue,
  statType = 'health',
}) => {
  return (
    <div className={`StatInfo StatInfo_${statType}`}>
      <div className="StatInfo__iconContainer">{icon}</div>
      <div>
        <span className="StatInfo__value">{value}</span>{' '}
        {aditionValue && (
          <span className="StatInfo__aditionValue">({aditionValue})</span>
        )}
      </div>
    </div>
  )
}
