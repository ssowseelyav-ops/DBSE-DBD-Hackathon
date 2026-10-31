package com.codespark.campus.complaint;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ComplaintController {
    private final ComplaintRepository repository;

    public ComplaintController(ComplaintRepository repository) {
        this.repository = repository;
    }

    public record AssignStaffRequest(@NotBlank String staffName) {}

    @GetMapping("/complaints")
    public List<Complaint> getComplaints() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/complaints/{id}")
    public Complaint getComplaintById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Complaint not found"));
    }

    @GetMapping("/complaints/student")
    public List<Complaint> getComplaintsByStudent(@RequestParam String email) {
        return repository.findAllByOrderByCreatedAtDesc().stream()
                .filter(c -> c.getStudentEmail().equalsIgnoreCase(email.trim()))
                .toList();
    }

    @PostMapping("/complaints")
    @ResponseStatus(HttpStatus.CREATED)
    public Complaint createComplaint(@Valid @RequestBody CreateComplaintRequest request) {
        Complaint complaint = new Complaint();
        complaint.setStudentName(request.studentName().trim());
        complaint.setStudentEmail(request.studentEmail().trim().toLowerCase());
        complaint.setTitle(request.title().trim());
        complaint.setDescription(request.description().trim());
        complaint.setCategory(request.category());
        complaint.setLocation(request.location().trim());
        complaint.setPriority(request.priority());
        complaint.setStatus(ComplaintStatus.PENDING);
        return repository.save(complaint);
    }

    @PatchMapping("/complaints/{id}/status")
    public Complaint updateStatus(@PathVariable Long id,
                                  @Valid @RequestBody UpdateStatusRequest request) {
        Complaint complaint = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Complaint not found"));
        complaint.setStatus(request.status());
        return repository.save(complaint);
    }

    @PatchMapping("/complaints/{id}/assign")
    public Complaint assignStaff(@PathVariable Long id,
                                 @Valid @RequestBody AssignStaffRequest request) {
        Complaint complaint = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Complaint not found"));
        complaint.setAssignedStaff(request.staffName().trim());
        if (complaint.getStatus() == ComplaintStatus.PENDING) {
            complaint.setStatus(ComplaintStatus.IN_PROGRESS);
        }
        return repository.save(complaint);
    }

    @GetMapping("/dashboard/stats")
    public Map<String, Long> getStats() {
        long total = repository.count();
        long pending = repository.countByStatus(ComplaintStatus.PENDING);
        long inProgress = repository.countByStatus(ComplaintStatus.IN_PROGRESS);
        long resolved = repository.countByStatus(ComplaintStatus.RESOLVED);
        return Map.of(
                "total", total,
                "pending", pending,
                "inProgress", inProgress,
                "resolved", resolved
        );
    }
}
