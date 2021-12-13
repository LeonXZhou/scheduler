export function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];

  const filteredDay = state.days.filter(d => {
    return d.name === day;
  })[0];

  if (!filteredDay) {
    return appointmentsForDay;
  }

  const appointmentIdsForDay = filteredDay.appointments;

  for (const appId of appointmentIdsForDay) {
    appointmentsForDay = [...appointmentsForDay, state.appointments[appId]];
  }

  return appointmentsForDay
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const modifiedInterview = {
    ...interview,
    interviewer: { ...state.interviewers[interview.interviewer] }
  };

  const appointmentForDayArray = { ...state.app, }

  return modifiedInterview
}