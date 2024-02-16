package com.helloutils.hellocode.controller;

import com.helloutils.hellocode.request.UtilCreate;
import com.helloutils.hellocode.response.UtilResponse;
import com.helloutils.hellocode.service.UtilService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UtilController {
    private final UtilService utilService;

    @GetMapping("/utils/{utilId}")
    public UtilResponse get(@PathVariable("utilId") Long utilId) {
        return utilService.get(utilId);
    }

    @PostMapping("/utils")
    public void post(@RequestBody UtilCreate request) {
        utilService.write(request);
    }
}
