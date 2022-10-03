import React from 'react';
import Calendar from 'react-awesome-calendar';




const Schedule = () => {

    //example, have to minupulate by onclick with a POST request
    const events = [{
        id: 1,
        color: '#fd3153',
        from: '2022-10-02T18:00:00+00:00',
        to: '2022-10-05T19:00:00+00:00',
        title: 'This is an event'
    }, {
        id: 2,
        color: '#1ccb9e',
        from: '2022-10-01T13:00:00+00:00',
        to: '2022-10-05T14:00:00+00:00',
        title: 'This is another event'
    }, {
        id: 3,
        color: '#3694DF',
        from: '2022-10-05T13:00:00+00:00',
        to: '2022-10-05T20:00:00+00:00',
        title: 'This is also another event'
    }, {
        id: 4,
        color: '#FF00FF',
        from: '2022-10-03T13:00:00+00:00',
        to: '2022-10-05T20:00:00+00:00',
        title: 'This is a test event'
    }];

    return (
        <div>
            <h1>Schedule</h1>
            <Calendar
                events={events}
                // mode="dailyMode"
            />
        </div>
    );
}

export default Schedule;