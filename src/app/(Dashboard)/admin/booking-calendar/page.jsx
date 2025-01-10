// BookingCalendar.jsx
"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";

export default function BookingCalendar() {
  const [events, setEvents] = useState([]);

  // Fetch events from the demo database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/demo-bookings"); // Replace with actual API endpoint
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle date click to create a new booking (for demo purposes)
  const handleDateClick = async (dateInfo) => {
    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Booking",
      start: dateInfo.dateStr,
      end: dateInfo.dateStr,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);

    // Save the new event to the database
    try {
      await axios.post("/api/demo-bookings", newEvent); // Replace with actual API endpoint
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        selectable={true}
        eventClick={(info) => alert(`Event: ${info.event.title}`)}
      />
    </div>
  );
}
