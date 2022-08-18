import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

// Highest level component
export default function Application(props) {
  // Custome hook that manages and sets the state
  const { state, setDay, bookInterview, deleteInterview } =
    useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const appointmentList = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interviewers={dailyInterviewers}
          interview={interview}
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentList}</section>
    </main>
  );
}
