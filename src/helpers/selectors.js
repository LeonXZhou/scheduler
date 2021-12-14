export function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];

  if (!day) {
    return appointmentsForDay;
  }

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
  
  return modifiedInterview
}


export function getInterviewersForDay(state, day) {
  let interviewersForDay = [];

  const filteredDay = state.days.filter(d => {
    return d.name === day;
  })[0];

  if (!filteredDay) {
    return interviewersForDay;
  }

  const interviewersIdForDay = filteredDay.interviewers;

  for (const i of interviewersIdForDay)
  {
    if (state.interviewers[i])
    {
      interviewersForDay = [...interviewersForDay,state.interviewers[i]]
    }
  }

  return interviewersForDay;
}
