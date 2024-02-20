package com.helloutils.hellocode.request;

import lombok.Getter;

@Getter
public class HealthStatus {
    private int healty;

    public HealthStatus(int healty) {
        this.healty = healty;
    }
}
