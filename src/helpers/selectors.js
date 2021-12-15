/**
 * @param {object} state - takes in the state object created in useApplicationData.js
 * @param {string} day - takes in name of the day ie Monday, Tuesday...
 * 
 * @returns an array of appointment objects for the provided day
 */
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

/**
 * @param {object} state takes in the state object created in useApplicationData.js
 * @param {object} interview takes in the interview object fetched from appointments data from database
 * 
 * @returns a new interview object formatted correctly for appointment component to use. 
 *          constains full interviewer object not just the interviewer id.
 */
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

/**
 * 
 * @param {object} state takes in the state object created in useApplicationData.js
 * @param {string} day takes in name of the day ie Monday, Tuesday...
 * @returns an array containing interviewer objects for the specified day
 */
export function getInterviewersForDay(state, day) {
  let interviewersForDay = [];

  const filteredDay = state.days.filter(d => {
    return d.name === day;
  })[0];

  if (!filteredDay) {
    return interviewersForDay;
  }

  const interviewersIdForDay = filteredDay.interviewers;

  for (const i of interviewersIdForDay) {
    if (state.interviewers[i]) {
      interviewersForDay = [...interviewersForDay, state.interviewers[i]]
    }
  }

  return interviewersForDay;
}

/**
 * @param {object} state takes in the state object created in useApplicationData.js
 * @param {string} day takes in name of the day ie Monday, Tuesday...
 * 
 * @returns the index of the the specified day in days
 */
export function getDayIndexByName(state, dayName) {
  for (const day in state.days) {
    if (state.days[day].name === dayName) {
      return day;
    }
  }
}


/**
 * 
 * @param {object} appointments the appointment object from state
 * @param {*} appointmentIds an array of appointment ids for the day
 * @param {*} dayId the day id we are looking at
 * 
 * @returns the number of appointments with interview as null
 */
export function getSpotsByDayId(appointments,appointmentIds, dayId) {
  let count = 0;
  for (const appointmentId of appointmentIds)
  {
    if(appointments[appointmentId].interview === null)
    {
      count++;
    }
  }
  return count;
}