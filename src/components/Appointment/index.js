import React from "react";
import "./styles.scss"
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode"


const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {props.interview ? <Show student={props.interview.student} 
      interviewer={props.interview.interviewer}
      onEdit={props.onEdit}
      onDelete={props.onDelete}></Show> : <Empty></Empty>}
    </article>
  );

}