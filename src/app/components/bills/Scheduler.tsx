import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";
import { SchedulerProps } from "../../../entities/model";

const Scheduler: React.FC<SchedulerProps> = ({ bills }) => {
  // const eventsService = useState(() => createEventsServicePlugin())[0];
  const [eventsService] = useState(() => createEventsServicePlugin());

  const events = bills.map((bill) => ({
    id: bill.id.toString() || "default id",
    title: bill.billTitle || "default title",
    start: bill.dueDate || new Date().toISOString(),
    end: bill.dueDate || new Date().toISOString(),
  }));

  const calendar = useCalendarApp({
    defaultView: "month",
    views: [
      createViewMonthGrid(),
      createViewDay(),
      createViewWeek(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [eventsService],
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, [eventsService]);

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default Scheduler;
