import React from 'react'

import './StatusBar.css'

export const StatusBar = ({ activeIndex = 0, count = 10 }) => {
  const items = React.useMemo(() => {
    const accItems = []

    for (let i = 0; i < count; i++) {
      const colorStyle =
        i > activeIndex
          ? 'default'
          : i > 6
          ? 'danger'
          : i > 1
          ? 'warning'
          : 'normal'

      accItems.push(
        <li
          key={i}
          className={`StatusBar__item StatusBar__item_${colorStyle}`}
        />
      )
    }

    return accItems
  }, [count])

  return <ul className="StatusBar">{items}</ul>
}
