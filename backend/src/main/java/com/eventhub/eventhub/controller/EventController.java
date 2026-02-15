package com.eventhub.eventhub.controller;

import com.eventhub.eventhub.entity.Event;
import com.eventhub.eventhub.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event) {
        Event created = eventService.createEvent(event);
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Event created",
                "data", created
        ));
    }

    
    @GetMapping
    public ResponseEntity<?> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", events
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Long id) {
        try {
            Event event = eventService.getEventById(id);
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "data", event
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        try {
            Event updated = eventService.updateEvent(id, event);
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Event updated",
                    "data", updated
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        try {
            eventService.deleteEvent(id);
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Event deleted"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }
    }
}
