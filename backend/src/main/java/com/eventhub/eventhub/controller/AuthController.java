package com.eventhub.eventhub.controller;

import java.util.Map;
import java.util.Optional;

import com.eventhub.eventhub.dto.LoginRequest;
import com.eventhub.eventhub.entity.User;
import com.eventhub.eventhub.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.ok(
                        Map.of("status", "success", "message", "Login successful")
                );
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("status", "fail", "message", "Invalid password"));
            }

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", "fail", "message", "User not found"));
        }
    }
    @PostMapping("/register")
    public User register(@RequestBody User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
}
}
