package com.helloutils.hellocode.controller;

import com.helloutils.hellocode.response.UtilResponse;
import com.helloutils.hellocode.service.UtilService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UtilController {
    private final UtilService utilService;

    @GetMapping("/utils/{utilId}")
    public UtilResponse get(@PathVariable Long utilId) {
        return utilService.get(utilId);
    }
}
