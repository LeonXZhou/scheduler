import React from "react";
import DayListItem from "components/DayListItem"
import classNames from "classnames";


/**
 * @param {object} props is an object with the 4 following parameters:
 * -days: an array of days objects
 * -value: the name of the currently selected day
 * -onChange: a function to up date the day part of state in UseApplicationData
 * 
 * @returns a component for a single day in the days selection side bar menu
 */
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