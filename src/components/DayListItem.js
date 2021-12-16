import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

/**
 * @param {object} props is an object with the 4 following parameters:
 * -selected: boolean
 * -spots: number of available spots for the day
 * -name: string for the name of the day ie Monday, Tuesday...
 * -setDay: a function for updating the day part of state in useApplicationData
 * 
 * @returns a component for a single day in the days selection side bar menu
 */
export default function DayListItem(props) {

  const DayListItemClass = classNames('day-list__item',
    { 'day-list__item--selected': props.selected },
    { 'day-list__item--full': (props.spots === 0) })
  
  const formatSpots = () => {
    if (props.spots === 0) {
      return 'no spots remaining'
    }
    if (props.spots === 1) {
      return '1 spot remaining'
    }
    return `${props.spots} spots remaining`
  }

  return (
    <li className={DayListItemClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}