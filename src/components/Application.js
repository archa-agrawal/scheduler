import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  },
  "6": {
    id: 6,
    time: "5pm"
  }
};

export default function Application(props) {
  const [state, setState] = useState({day: 'Monday',appointments: {}, days:[], interviewers: {}})
  const setDay = (day) => setState({...state, day:day})
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((all) => {
      console.log(all[2].data)
      setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  const bookInterview = (id, interview) => {
    console.log(interview)
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {
      interview
    })
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      setState({...state, appointments})
    })    
  }
  const deleteInterview = (id) => {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      const appointment = {...state.appointments[id]};
    appointment.interview = null;
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    setState({...state, appointments})
    }) 
  }
  const dailyInterviewers = getInterviewersForDay(state, state.day)

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    console.log(appointment.id, interview);
   return (
    < Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interviewers={dailyInterviewers}
        interview={interview}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
    />
   )
  })

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
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}
