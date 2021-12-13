
import React, { useState, useEffect } from "react";

import "components/Application.scss";
import Axios from "axios";

import DayList from "components/DayList"
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => { setState(prev => { return { ...prev, day } }) };

  useEffect(() => {
    const getDataPromises = [Axios.get('http://localhost:8001/api/days'),
    Axios.get('http://localhost:8001/api/appointments'),
    Axios.get('http://localhost:8001/api/interviewers')]

    Promise.all(getDataPromises)
      .then((all) => {
        setState((prev) => {
          return {
            ...prev,
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data,
          }
        });
      });
  }, [])

  const dailyAppointments = getAppointmentsForDay({
    ...state
  }, state.day);

  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    )

  });

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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
