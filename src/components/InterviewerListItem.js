import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

// Returns each interviewer
const InterviewerListItem = (interviewer) => {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": interviewer.selected,
  });
  const imageClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": interviewer.selected,
  });

  return (
    <li
      key={interviewer.id}
      className={interviewerClass}
      onClick={interviewer.setInterviewer}
    >
      <img
        className={imageClass}
        src={interviewer.avatar}
        alt={interviewer.name}
      />
      {interviewer.selected && interviewer.name}
    </li>
  );
};
export default InterviewerListItem;
