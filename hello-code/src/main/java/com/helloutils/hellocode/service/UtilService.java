package com.helloutils.hellocode.service;

import com.helloutils.hellocode.domain.Util;
import com.helloutils.hellocode.exception.UtilNotFound;
import com.helloutils.hellocode.repository.Util.UtilRepository;
import com.helloutils.hellocode.response.UtilResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UtilService {
    private final UtilRepository utilRepository;

    public UtilResponse get(Long id) {
        Util util = utilRepository.findById(id)
                .orElseThrow(UtilNotFound::new);


        return UtilResponse.builder()
                .id(util.getId())
                .title(util.getTitle())
                .description(util.getDescription())
                .code(util.getCode())
                .build();
    }
}
