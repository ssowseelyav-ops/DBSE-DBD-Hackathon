package com.codespark.campus.complaint;

import jakarta.validation.constraints.NotNull;

public record UpdateStatusRequest(@NotNull ComplaintStatus status) {}
