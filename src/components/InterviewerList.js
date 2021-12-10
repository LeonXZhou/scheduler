import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"
// import classNames from 'classnames';

export default function InterviewerList(props) {

  const interviewerItems = props.interviewers.map((inter) => {
    return <InterviewerListItem
    key = {inter.id}
    avatar = {inter.avatar}
    name = {inter.name}
    selected = {props.value === inter.id}
    setInterviewer = {() => {props.onChange(inter.id)}}>
    </InterviewerListItem>
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerItems}
      </ul>
    </section>
  )
}