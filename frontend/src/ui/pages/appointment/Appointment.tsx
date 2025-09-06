import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import type { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core/index.js';

const STORAGE_KEY = 'appointments:v1';

const Appointment: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [events, setEvents] = useState<EventInput[]>([]);

  // Charger depuis localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEvents(JSON.parse(raw));
      else {
        // quelques événements d’exemple
        setEvents([
          { id: '1', title: 'Réunion Interne', start: new Date().toISOString() },
          { id: '2', title: 'Consultation Jean Marie', start: new Date(Date.now() + 3600e3).toISOString() },
        ]);
      }
    } catch {}
  }, []);

  // Sauver dans localStorage
  const persist = () => {
    const api = calendarRef.current?.getApi();
    if (!api) return;
    interface PersistedEvent {
      id: string;
      title: string;
      start: string;
      end?: string;
      allDay: boolean;
    }

    const current: PersistedEvent[] = api.getEvents().map((e): PersistedEvent => ({
      id: e.id,
      title: e.title,
      start: e.startStr,
      end: e.endStr || undefined,
      allDay: e.allDay,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    setEvents(current);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = window.prompt('Titre de l’événement :');
    const api = selectInfo.view.calendar;
    api.unselect();

    if (title) {
      api.addEvent({
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
      persist();
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const ok = window.confirm(`Supprimer l’événement "${clickInfo.event.title}" ?`);
    if (ok) {
      clickInfo.event.remove();
      persist();
    }
  };

  const afterMutate = () => persist(); // drop/resize

  return (
    <div className="h-full flex flex-col">
      {/* Header / actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 mr-2">
        <h2 className="text-lg font-semibold">Calendrier des rendez-vous</h2>
        <p className="text-sm text-gray-500">Double-clique sur une plage ou sélectionne pour créer un événement.</p>
      </div>

      {/* Zone calendrier qui prend l’espace restant */}
      <div className="pt-3 mr-2 flex-1 min-h-0">
        <div className="bg-white h-full rounded-xl shadow-sm border border-gray-200 overflow-hidden p-2">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
             
            locale="fr"
            timeZone="Indian/Antananarivo"
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            buttonText={{
              today: "Aujourd'hui",
              month: 'Mois',
              week: 'Semaine',
              day: 'Jour',
              list: 'Liste',
            }}
            height="100%"
            selectable
            selectMirror
            editable
            dayMaxEvents
            eventOverlap
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventDrop={afterMutate}
            eventResize={afterMutate}
          />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
