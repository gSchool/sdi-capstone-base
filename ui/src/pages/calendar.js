// import React from 'react'
// import FullCalendar from '@fullcalendar/react'
// import interactionPlugin from "@fullcalendar/interaction"
// import dayGridPlugin from '@fullcalendar/daygrid'


// export default class Calendar extends React.Component {
//   render() {
//     return (
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView='dayGridMonth'

//         //dateClick={this.handleDateClick}

//         headerToolbar={
//           center = 'addEventButton'
//         }

//         customButtons= {
//           addEventButton= {
//             text= 'add event...'
//       click: function() {
//         var dateStr = prompt('Enter a date in YYYY-MM-DD format');
//         var date = new Date(dateStr + 'T00:00:00'); // will be in local time

//         if (!isNaN(date.valueOf())) { // valid?
//           Calendar.addEvent({
//             title: 'dynamic event',
//             start: date,
//             allDay: true
//           });
//           alert('Great. Now, update your database...');
//         } else {
//           alert('Invalid date.');
//         }
//       }
//   }
// }

// />
//     )
//   }

// handleDateClick = (arg) => {
//   alert(arg.dateStr)
// }

//   // var calendar = new Calendar(calendarEl, {
//   //   timeZone: 'UTC',
//   //   events: [
//   //     {
//   //       id: 'a',
//   //       title: 'my event',
//   //       start: '2018-09-01'
//   //     }
//   //   ]
//   // })

//   // var event = calendar.getEventById('a') // an event object!
//   // var start = event.start // a property (a Date object)
//   // console.log(start.toISOString()) // "2018-09-01T00:00:00.000Z"

// }