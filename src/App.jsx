import React from "react";

import { WeatherProvider, Dashboard } from "./jsx/ui";

function App() {
  return (
  <WeatherProvider>
    <Dashboard />
  </WeatherProvider>
  )
}

export default App