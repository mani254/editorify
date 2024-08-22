// src/core/calendar/CalendarComponent.jsx
const React = require("react");
const { useEffect } = React;
const Calendar = require("./calendar");
require("./calendar.css");

const CalendarComponent = ({ id }) => {
	useEffect(() => {
		new Calendar(id);
	}, [id]);

	return React.createElement("div", { id: id, className: "calendar-container" });
};

module.exports = CalendarComponent;
