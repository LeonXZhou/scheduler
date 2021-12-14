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


  // this useEffect updates spots remaining
  // it will only run when state.appointments are updated. 
  // since appointments are ONLY update when the ajax COMPLETES 
  // this will only run once the request is successful either on
  // delete or add.
  useEffect(() => {
    const dayId = getDayIndexByName(state, state.day)
    if (dayId) {
      const day = {
        ...state.days[dayId],
        appointments: [...state.days[dayId].appointments],
        interviewers: [...state.days[dayId].interviewers],
        spots: getSpotsByDayId(state, dayId)
      }
      const newDays = [
        ...state.days
      ]
      newDays[dayId] = { ...day };

      setState((prev) => {
        return {
          ...prev, days: newDays
        }
      })
    }
  }, [state.appointments])

  // setDay is passed as onChange Prop to DayList. Called when a DayListItem 
  // is clicked on the side bar
  const setDay = (day) => { setState(prev => { return { ...prev, day } }) };
  console.log(state);////////////////////////// REMOVE ME

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Axios.put(`http://localhost:8001/api/appointments/${id}`,
      { interview })
      .then((response) => {
        setState((prev) => { return { ...prev, appointments } })
      })
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return Axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((response) => {
        setState((prev) => { return { ...prev, appointments } })
      })
  }

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

  return { state, setDay, bookInterview, cancelInterview };
}
