import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export const EventCalendar = ({ events = [] }) => {
  const calendarEvents = events.map(event => ({
    title: event.name,
    start: new Date(event.date),
    end: new Date(event.date),
    allDay: true,
    resource: event
  }));

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};
