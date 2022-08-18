/**
 * Finds and returns appointments for the given day
 * @param {object} state - application state
 * @param {string} day - selected day
 * @returns array of appointments for the given day
 */
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

/**
 * Finds and returns interviewers for the given day
 * @param {object} state - application state
 * @param {string} day - selected day
 * @returns array of interviewers for the given day
 */
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

/**
 * Create new interview
 * @param {object} state - application state
 * @param {object} interview
 * @returns new interview object
 */
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
