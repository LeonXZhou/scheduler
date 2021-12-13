import React, { useState } from "react"


export default function DayListItem(initialMode) {
  const [mode, setMode] = useState(initialMode);

  function transition(newMode) {
    setMode(newMode);
  }

  return { mode, transition }
}