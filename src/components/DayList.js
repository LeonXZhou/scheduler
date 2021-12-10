import React from "react";
import DayListItem from "components/DayListItem"
import classNames from "classnames";

export default function DayList(props) {
  const DayListItems = props.days.map((day) => {return(
    <DayListItem
      key = {day.id}
      name = {day.name}
      spots = {day.spots}
      selected = {day.name === props.value}
      setDay = {props.onChange}>
    </DayListItem>);
  });
  return (
    <ul>
      {DayListItems}
    </ul>
  );
}