import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss';

const DayListItem = (props) => {
  let DayListItemClass = 'day-list__item'
  DayListItemClass += classNames({'--selected': props.selected}, {'--full': (props.spots===0)})
  
  const formatSpots = (spotsRemaining) => {
    if (spotsRemaining === 0) {
      return 'no spots remaining'
    } else if (spotsRemaining === 1) {
      return '1 spot remaining'
    } else {
      return `${spotsRemaining} spots remaining`
    }
  }
  const totalSpots = formatSpots(props.spots)
  return (
    <li className={DayListItemClass} onClick={()=> props.setDay(props.name)}>
      <h2  className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{totalSpots}</h3>
    </li>
  );
}
export default DayListItem;