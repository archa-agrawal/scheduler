import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  const DayLists = props.days.map((day) => {
    return(
      <DayListItem 
      id={day.id} 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.value}
      setDay={props.onChange}
    />
    )
  })
  return (
    <ul>
      {DayLists}
    </ul>
  )
}
export default DayList;