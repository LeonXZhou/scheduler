
import React from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  //structures appointment data for currently selected day
  const dailyAppointments = getAppointmentsForDay({
    ...state
  }, state.day);

  //structures interviewer data for currently selected day
  const interviewersForDay = getInterviewersForDay(state, state.day);

  //creats an array of Appointment components for the currently selected day
  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewersForDay={interviewersForDay}
        bookInterview={bookInterview}
        onDelete={cancelInterview}
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
      <section className="schedule" data-testid="appointments">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
