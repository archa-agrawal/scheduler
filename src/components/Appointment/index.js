import React, {Fragment} from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  let initial;

  if (props.interview) {
    initial = SHOW
  } else {
    initial = EMPTY
  }
  const { mode, transition, back } = useVisualMode(initial)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    }) 
  }

  const confirmDelete = (id) => {
    transition(DELETING)
    props.deleteInterview(id)
    .then(() => {
      transition(EMPTY)
    })

  } 
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SAVING && <Status message="saving"/>}
      {mode === DELETING && <Status message="deleting"/>}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} id={props.id} onCancel={back} onConfirm={confirmDelete}/>}
      {mode === EDIT && <Form interviewers={props.interviewers} student={props.interview.student} interviewerId={props.interview.interviewer.id} onCancel={back} onSave={save} />}
    </article>
  )
  
}
export default Appointment;
