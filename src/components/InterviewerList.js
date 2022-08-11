import React from "react";
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (interviewersData) => {
  console.log(interviewersData)
  const interviewerList = interviewersData.interviewers.map((interviewer, index) => {
    return (
      <InterviewerListItem
        key = {index} 
        id = {interviewer.id} 
        name = {interviewer.name}
        avatar = {interviewer.avatar}
        selected={interviewer.id === interviewersData.value}
        setInterviewer={() => interviewersData.onChange(interviewer.id)}    
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