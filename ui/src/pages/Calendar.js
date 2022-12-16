import config from '../config';
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

export const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getTimeSlots = async () => {
      try {
        let res = await fetch(ApiUrl + '/time_slots', {
          credentials: 'include'
        });
        let resJson = await res.json();

        if (res.status !== 200) {
          alert(resJson);
        }

        resJson = resJson.filter(slot => slot.type === 'shift')

        resJson = resJson.map(slot => {
          return {
            id: slot.id,
            title: "Regular Shift",
            start: new Date(slot.start_datetime),
            end: new Date(slot.end_datetime),
          }
        })

        res = await fetch(ApiUrl + '/time_slots?need_replacement=true', {
          credentials: 'include'
        });
        let resJsonReplacement = await res.json();

        if (res.status !== 200) {
          alert(resJson);
        }

        resJsonReplacement = resJsonReplacement.map(slot => {
          return {
            id: slot.id,
            title: "Replacement Needed",
            start: new Date(slot.start_datetime),
            end: new Date(slot.end_datetime),
            backgroundColor: '#9c27b0'
          }
        })

        setEvents(resJson.concat(resJsonReplacement));
      } catch(err) {
        console.log(err);
      }
    }
    getTimeSlots();
  }, [])

  return (
    <div style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px'}}>
      <FullCalendar
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        plugins={[daygridPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        events={events}
        eventDisplay={'block'}
        displayEventEnd={true}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        }}
        height={'85vh'}
      />;
    </div>
  );
};

export default Calendar;