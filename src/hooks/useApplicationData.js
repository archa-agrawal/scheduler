import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    appointments: {},
    days: [],
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day: day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const bookInterview = (id, interview) => {
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        const currentInterview = state.appointments[id].interview;
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        const day = Math.floor((id - 1)/ 5);
        const currentSpots = state.days[day].spots;
        const days = [
          ...state.days.slice(0, day),
          {
            ...state.days[day],
            spots: currentSpots - (currentInterview ? 0 : 1),
          },
          ...state.days.slice(day + 1),
        ];
        setState({ ...state, days, appointments });
      });
  };
  const deleteInterview = (id) => {
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const appointment = { ...state.appointments[id] };
        appointment.interview = null;
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        const day = Math.floor((id -1)/ 5);
        const currentSpots = state.days[day].spots;
        const days = [
          ...state.days.slice(0, day),
          { ...state.days[day], spots: currentSpots + 1 },
          ...state.days.slice(day + 1),
        ];
        setState({ ...state, days, appointments });
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  };
};

export default useApplicationData;
