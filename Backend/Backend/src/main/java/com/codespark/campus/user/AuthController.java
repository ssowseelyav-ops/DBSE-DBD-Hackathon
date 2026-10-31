package com.codespark.campus.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public record RegisterRequest(
            @NotBlank String name,
            @NotBlank @Email String email,
            @NotBlank String password,
            UserRole role
    ) {}

    public record LoginRequest(
            @NotBlank @Email String email,
            @NotBlank String password
    ) {}

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> register(@RequestBody RegisterRequest request) {
        String cleanEmail = request.email().trim().toLowerCase();
        if (userRepository.existsByEmail(cleanEmail)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }

        UserRole role = request.role() != null ? request.role() : UserRole.STUDENT;
        User user = new User(request.name().trim(), cleanEmail, request.password(), role);
        userRepository.save(user);

        return Map.of(
                "message", "User registered successfully",
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole()
        );
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request) {
        String cleanEmail = request.email().trim().toLowerCase();
        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!user.getPassword().equals(request.password())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        return Map.of(
                "message", "Login successful",
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole(),
                "token", "demo-token-" + user.getId() + "-" + System.currentTimeMillis()
        );
    }

    @GetMapping("/staff")
    public List<User> getStaffList() {
        return userRepository.findByRole(UserRole.STAFF);
    }
}
