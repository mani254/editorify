dist 
   calendar
      calendar.js
      calendar.css
   editor
      editor.css
      editor.js
   index.js
   styles.css
src
   core
      calendar
         calendar.css
         calendar.js
         calendarComponent.jsx
         index.js
      editor
         editor.js
         editor.css
         editorComponent.jsx
         index.js
   index.js
.babelrc
package.json
webpack.config.js

this is my folder structure in this i have 

/* src/core/calendar/calendar.css */
.calendar-container {
	border: 1px solid #ccc;
	padding: 10px;
	margin: 10px;
}

.calendar {
	background-color: #e0e0e0;
	height: 200px;
}
// src/core/calendar/calendar.js
class Calendar {
   constructor(id) {
      this.id = id;
      this.createCalendar();
   }

   createCalendar() {
      const element = document.getElementById(this.id);
      if (element) {
         const calendarDiv = document.createElement('div');
         calendarDiv.className = 'calendar';
         element.appendChild(calendarDiv);
      }
   }
}

module.exports = Calendar;



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

// src/core/calendar/index.jsx
const Calendar = require('./calendar.js')
const CalendarComponent = require('./CalendarComponent.jsx')

module.exports = { Calendar, CalendarComponent }

/* src/core/editor/editor.css */
.editor-container {
	border: 1px solid #ccc;
	padding: 10px;
	margin: 10px;
}

.editor {
	background-color: #f9f9f9;
	height: 200px;
}

// src/core/editor/editor.js
class Editor {
   constructor(id) {
      this.id = id;
      this.createEditor();
   }

   createEditor() {
      const element = document.getElementById(this.id);
      if (element) {
         const editorDiv = document.createElement('div');
         editorDiv.className = 'editor';
         element.appendChild(editorDiv);
      }
   }
}

module.exports = Editor;
// src/core/editor/EditorComponent.jsx
const React = require("react");
const { useEffect } = React;
const Editor = require("./editor");
require("./editor.css");

const EditorComponent = ({ id }) => {
	useEffect(() => {
		new Editor(id);
	}, [id]);

	return React.createElement("div", { id: id, className: "editor-container" });
};

module.exports = EditorComponent;
//src/core/editor/index.js
const Editor = require('./editor.js')
const EditorComponent = require('./EditorComponent.jsx')

module.exports = { Editor, EditorComponent }
