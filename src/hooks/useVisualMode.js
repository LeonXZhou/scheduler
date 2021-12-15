import React, { useState } from "react"

//custom hook for keeping track of the visual state of the appointment component
export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);

  //update history to transition to new visual display for appointment
  function transition(newMode, replaceBool = false) {
    if (!replaceBool) {
      setHistory((prev) => { return [newMode, ...prev] });
    }
    else {
      setHistory((prev) => { return [newMode, ...prev.slice(1)]});
    }
  }

  //update history to return to previous visual display for appointment
  function back() {
    if (history.length <= 1) {
      return { mode: history[0], transition, back };
    }
    setHistory((prev) => { return prev.slice(1) });
  }

  return { mode: history[0], transition, back };
}