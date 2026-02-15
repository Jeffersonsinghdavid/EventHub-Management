package com.eventhub.eventhub.service.impl;

import com.eventhub.eventhub.entity.Event;
import com.eventhub.eventhub.repository.EventRepository;
import com.eventhub.eventhub.service.EventService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
    }

    @Override
    public Event updateEvent(Long id, Event event) {
        Event existing = getEventById(id);

        existing.setTitle(event.getTitle());
        existing.setDescription(event.getDescription());
        existing.setLocation(event.getLocation());
        existing.setDate(event.getDate());

        return eventRepository.save(existing);
    }

    @Override
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
