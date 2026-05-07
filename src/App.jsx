import React from "react";

import { WeatherProvider, Dashboard } from "./jsx/ui.jsx";

function App() {
  return (
  <WeatherProvider>
    <Dashboard />
  </WeatherProvider>
  )
}

export default App