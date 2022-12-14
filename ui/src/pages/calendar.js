import React from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from "@fullcalendar/interaction"
import dayGridPlugin from '@fullcalendar/daygrid'





export default class Calendar extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin]}
        //initialView="dayGridMonth"
        dateClick={this.handleDateClick}
      />
    )
  }

  handleDateClick = (arg) => { 
    alert(arg.dateStr)
  }
  
  // var calendar = new Calendar(calendarEl, {
  //   timeZone: 'UTC',
  //   events: [
  //     {
  //       id: 'a',
  //       title: 'my event',
  //       start: '2018-09-01'
  //     }
  //   ]
  // })
  
  // var event = calendar.getEventById('a') // an event object!
  // var start = event.start // a property (a Date object)
  // console.log(start.toISOString()) // "2018-09-01T00:00:00.000Z"

}