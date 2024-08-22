import React from "react";
import { createRoot } from "react-dom/client";
import { CalendarComponent } from "editorify-dev/calendar";

const App = () => (
   <div>
      <h1>Calendar Demo</h1>
      <CalendarComponent id="calendar-container" />
   </div>
);


const container = document.getElementById("root");

const root = createRoot(container);
root.render(<App />);
