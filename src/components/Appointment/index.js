import React from "react";
import "./styles.scss"
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR = "ERROR";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(() => { transition(ERROR,true) });
  };

  const del = () => {
    transition(DELETING,true);
    props.onDelete(props.id)
      .then(() => { transition(EMPTY) })
      .catch(() => { transition(ERROR,true) });
  }

  return (
    <article className="appointment">
      <Header time={props.time}></Header>

      {mode === EMPTY && <Empty onAdd={() => {
        transition(CREATE);
      }} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => { transition(EDIT) }}
          onDelete={() => { transition(CONFIRM) }}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewersForDay} onCancel={back} onSave={save} />
      )}

      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}

      {mode === CONFIRM && <Confirm
        message={"Are you sure you want to delete this appointment?"}
        onCancel={() => { back() }}
        onConfirm={del} />
      }

      {mode === EDIT && <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        interviewers={props.interviewersForDay}
        onCancel={back}
        onSave={save} />}

      {mode === ERROR && <Error onClose ={back}/>}
    </article>
  );

}
