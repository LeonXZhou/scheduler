import React from 'react';
import PropTypes from 'prop-types';
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"

/**
 * @param {object} props is an object with the 3 following parameters:
 * -interviewers: an array of interviewer objects represeting the available interviewer to be rendered
 * -value: this is the number id of the currently selected Interviewer. (Interviewer state in Form.js)
 * -onChange: a funciton for updating the state of Interviewer in Form.js
 * 
 * @returns the interview selection component
 */
function InterviewerList(props) {

  const interviewerItems = props.interviewers.map((inter) => {
    return <InterviewerListItem
      key={inter.id}
      avatar={inter.avatar}
      name={inter.name}
      selected={props.value === inter.id}
      setInterviewer={() => { props.onChange(inter.id) }}>
    </InterviewerListItem>
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerItems}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList