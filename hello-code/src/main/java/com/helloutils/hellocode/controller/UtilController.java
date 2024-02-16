package com.helloutils.hellocode.controller;

import com.helloutils.hellocode.domain.Util;
import com.helloutils.hellocode.request.UtilCreate;
import com.helloutils.hellocode.response.UtilResponse;
import com.helloutils.hellocode.service.UtilService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UtilController {
    private final UtilService utilService;

    @GetMapping("/utils/{utilId}")
    public UtilResponse get(@PathVariable("utilId") Long utilId) {
        return utilService.get(utilId);
    }


    @GetMapping("/utils")
    public List<UtilResponse> getList(@RequestParam int page, @RequestParam int size) {
        return utilService.getList(page, size);
    }

    @PostMapping("/utils")
    public void post(@RequestBody UtilCreate request) {
        utilService.write(request);
    }
}
