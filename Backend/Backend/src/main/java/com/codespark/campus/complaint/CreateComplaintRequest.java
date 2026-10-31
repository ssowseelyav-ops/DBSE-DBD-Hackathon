package com.codespark.campus.complaint;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateComplaintRequest(
        @NotBlank @Size(max = 100) String studentName,
        @NotBlank @Email @Size(max = 150) String studentEmail,
        @NotBlank @Size(max = 120) String title,
        @NotBlank @Size(max = 2000) String description,
        @NotNull ComplaintCategory category,
        @NotBlank @Size(max = 180) String location,
        @NotNull ComplaintPriority priority
) {}
