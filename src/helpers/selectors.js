export function getAppointmentsForDay(state, day) {
  let appointmentForDayArray = [];

  const filteredDay = state.days.filter(d => {
    return d.name === day;
  })[0];

  if (!filteredDay) {
    return appointmentForDayArray;
  }

  const appointmentIdsForDay = filteredDay.appointments;

  for (const appId of appointmentIdsForDay) {
    appointmentForDayArray = [...appointmentForDayArray, state.appointments[appId]];
  }

  return appointmentForDayArray
}