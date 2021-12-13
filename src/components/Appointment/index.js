import React from "react";
import "./styles.scss"
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => {
        console.log("Clicked onAdd");
        transition(CREATE);
      }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={[]} onCancel={back}/>
      )}
    </article>
  );

}
// {props.interview ? <Show student={props.interview.student}
// interviewer={props.interview.interviewer}
// onEdit={props.onEdit}
// onDelete={props.onDelete}></Show> : <Empty></Empty>}