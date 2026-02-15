package com.eventhub.eventhub.service;

import com.eventhub.eventhub.entity.Event;
import java.util.List;

public interface EventService {

    Event createEvent(Event event);

    List<Event> getAllEvents();

    Event getEventById(Long id);

    Event updateEvent(Long id, Event event);

    void deleteEvent(Long id);
}
