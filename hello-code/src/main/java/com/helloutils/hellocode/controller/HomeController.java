package com.helloutils.hellocode.controller;

import com.helloutils.hellocode.request.HealthStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
  @GetMapping("/")
  public String hello() {
    return "hello world!";
  }

  //Docker Health check 를 위한 endpoint
  @GetMapping("/health")
  public ResponseEntity<HealthStatus> healthCheck() {
    HealthStatus status = new HealthStatus(1);
    return new ResponseEntity<>(status, HttpStatus.OK);
  }
}