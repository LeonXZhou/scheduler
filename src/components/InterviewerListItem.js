import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from 'classnames';


/**
 * @param {object} props is an object with the 4 following parameters:
 * -selected: (boolean),
 * -setInterviewer: function for updating the interviewer state create in Form.js
 * -name: string representing the interviewers name
 * -avatar: url string containing source of the interviewers picture
 * 
 * @returns the component representing a single head bubble for interviewer selection
 */
export default function InterviewerListItem(props) {

  const interviewerClass = classNames(
    'interviewers__item', { 'interviewers__item--selected': props.selected }
  );

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        // className={interviewerClass + "-image"}
        className={"interviewers__item-image"}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}