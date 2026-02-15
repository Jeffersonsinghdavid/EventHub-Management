package com.eventhub.eventhub.repository;

import com.eventhub.eventhub.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    
}
