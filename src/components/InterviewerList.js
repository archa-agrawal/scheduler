import React from "react";
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {
  const interviewerList = props.interviewers.map((interviewer, index) => {
    return (
      <InterviewerListItem
        key = {index} 
        id = {interviewer.id} 
        name = {interviewer.name}
        avatar = {interviewer.avatar}
        selected={interviewer.id === props.currentInterviewerId}
        setInterviewer={() => props.onChange(interviewer.id)}    
      />    
    )         
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>

  )
}
export default InterviewerList;