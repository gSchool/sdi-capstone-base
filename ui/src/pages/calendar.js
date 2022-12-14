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


}