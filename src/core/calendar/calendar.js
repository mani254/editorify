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

