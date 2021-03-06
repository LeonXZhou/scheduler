import React, { useState, useEffect } from "react"
import Axios from "axios";
import { getDayIndexByName, getSpotsByDayId } from "helpers/selectors";

export default function useApplicationData(initialMode) {
  const [state, setState] = useState({
    day: "Monday",    //default selected DayListItem is "Monday"
    days: [],
    appointments: {},
    interviewers: {},
  });

  // setDay is passed as onChange Prop to DayList. Called when a DayListItem 
  // is clicked on the side bar
  const setDay = (day) => { setState(prev => { return { ...prev, day } }) };

  //initial load of data from database
  useEffect(() => {
    const getDataPromises = [Axios.get('http://localhost:8001/api/days'),
    Axios.get('http://localhost:8001/api/appointments'),
    Axios.get('http://localhost:8001/api/interviewers')];
    Promise.all(getDataPromises)
      .then((all) => {
        setState((prev) => {
          return {
            ...prev,
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data,
          };
        });
      })
      .catch(err => console.log(err));
  }, []);

  //function for updating state when a interview is booked or edited. takes in an interview object
  //and the id of the appointment to be updated
  const bookInterview = (id, interview) => {
    //creating new appointment information
    const newAppointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const newAppointments = {
      ...state.appointments,
      [id]: newAppointment
    };
    //creating new days information
    const dayId = getDayIndexByName(state, state.day)
    const newDay = {
      ...state.days[dayId],
      appointments: [...state.days[dayId].appointments],
      interviewers: [...state.days[dayId].interviewers],
      spots: getSpotsByDayId(newAppointments, state.days[dayId].appointments, dayId)
    }
    const newDays = [
      ...state.days
    ]
    newDays[dayId] = { ...newDay };

    return Axios.put(`http://localhost:8001/api/appointments/${id}`,
      { interview })
      .then((response) => {
        setState((prev) => { return { ...prev, appointments: newAppointments, days: newDays } })
      })
  };

  //function for updating state when a interview is cancelled. takes in an interview object
  //and the id of the appointment to be updated
  const cancelInterview = (id) => {
    //creating new appointment information
    const newAppointment = {
      ...state.appointments[id],
      interview: null
    };
    const newAppointments = {
      ...state.appointments,
      [id]: newAppointment
    }
    //creating new days information
    const dayId = getDayIndexByName(state, state.day)
    const newDay = {
      ...state.days[dayId],
      appointments: [...state.days[dayId].appointments],
      interviewers: [...state.days[dayId].interviewers],
      spots: getSpotsByDayId(newAppointments, state.days[dayId].appointments, dayId)
    }
    const newDays = [
      ...state.days
    ]
    newDays[dayId] = { ...newDay };

    return Axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((response) => {
        setState((prev) => { return { ...prev, appointments: newAppointments, days: newDays } })
      })
  }


  return { state, setDay, bookInterview, cancelInterview };
}
