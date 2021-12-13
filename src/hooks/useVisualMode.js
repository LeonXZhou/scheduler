import React, { useState } from "react"


export default function DayListItem(initialMode) {
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replaceBool = false) {
    if (!replaceBool) {
      setHistory((prev) => { return [newMode, ...prev] });
    }
    else {
      setHistory((prev) => { return [newMode, ...prev.slice(1)]});
    }
  }

  function back() {
    if (history.length <= 1) {
      return { mode: history[0], transition, back };
    }
    setHistory((prev) => { return prev.slice(1) });
  }
  return { mode: history[0], transition, back };
}