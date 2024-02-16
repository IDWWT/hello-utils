package com.helloutils.hellocode.service;

import com.helloutils.hellocode.domain.Util;
import com.helloutils.hellocode.repository.UtilRepository;
import com.helloutils.hellocode.response.UtilResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.helloutils.hellocode.exception.UtilNotFound;

@Slf4j
@Service
@RequiredArgsConstructor
public class UtilService {
    private final UtilRepository utilRepository;

    public UtilResponse get(Long id) {
        Util util = utilRepository.findById(id)
                .orElseThrow(UtilNotFound::new);

        return UtilResponse.builder()
                .utilId(util.getUtilId())
                .title(util.getTitle())
                .description(util.getDescription())
                .code(util.getCode())
                .categoryCd(util.getCategoryCd())
                .languageCd(util.getLanguageCd())
                .createdAt(util.getCreatedAt())
                .build();
    }
}
