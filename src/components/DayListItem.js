import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss';

const DayListItem = (props) => {
  let DayListItemClass = 'day-list__item'
  DayListItemClass = classNames('day-list__item', {'day-list__item--selected': (props.selected)}, {'day-list__item--full': (props.spots===0)})
  
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
  const clickHandler = ()=> {
    if(props.setDay){
      props.setDay(props.name)
    }
  }
  return (
    <li key={props.id} className={DayListItemClass} onClick={clickHandler} data-testid="day">
      <h2  className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{totalSpots}</h3>
    </li>
  );
}
export default DayListItem;