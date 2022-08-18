const getAppointmentsForDay = (state, day) => {
  const appointmentList = [];
  let appointmentIds = [];

  for (const oneDay of state.days) {
    if (oneDay.name === day) {
      appointmentIds = [...oneDay.appointments];
    }
  }

  for (const id of appointmentIds) {
    let appointment = { ...state.appointments[id] };
    appointmentList.push(appointment);
  }
  return appointmentList;
};
const getInterviewersForDay = (state, day) => {
  const interviewersList = [];
  let interviewersIds = [];

  for (const oneDay of state.days) {
    if (oneDay.name === day) {
      interviewersIds = [...oneDay.interviewers];
    }
  }

  for (const id of interviewersIds) {
    let interviewer = { ...state.interviewers[id] };
    interviewersList.push(interviewer);
  }
  return interviewersList;
};
const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  if (state.interviewers[interview.interviewer]) {
    const newInterview = {
      interviewer: { ...state.interviewers[interview.interviewer] },
      student: interview.student,
    };
    return newInterview;
  }
};

export { getAppointmentsForDay, getInterviewersForDay, getInterview };
