package com.helloutils.hellocode.service;

import com.helloutils.hellocode.domain.Util;
import com.helloutils.hellocode.pagination.PageInfo;
import com.helloutils.hellocode.repository.UtilRepository;
import com.helloutils.hellocode.request.UtilCreate;
import com.helloutils.hellocode.response.UtilResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.helloutils.hellocode.exception.UtilNotFound;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UtilService {
    private final UtilRepository utilRepository;

    public void write(UtilCreate utilCreate) {
        Util util = Util.builder()
                .userId(utilCreate.getUserId())
                .title(utilCreate.getTitle())
                .description(utilCreate.getDescription())
                .code(utilCreate.getCode())
                .languageCd(utilCreate.getLanguageCd())
                .categoryCd(utilCreate.getCategoryCd())
                .build();
        utilRepository.save(util);
    }

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

    public List<UtilResponse> getList(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page-1, size);

        Page<Util> pageUtilList = utilRepository.findAllByOrderByCreatedAtDesc(pageRequest);
        List<Util> utilList = pageUtilList.getContent();

        PageInfo pageInfo = PageInfo.builder()
                .page(page)
                .size(size)
                .totalElements(pageUtilList.getTotalElements())
                .totalPages(pageUtilList.getTotalPages())
                .build();

        return utilList.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

    }

    private UtilResponse convertToResponse(Util util) {
        return UtilResponse.builder()
                .utilId(util.getUtilId())
                .code(util.getCode())
                .description(util.getDescription())
                .languageCd(util.getLanguageCd())
                .categoryCd(util.getCategoryCd())
                .title(util.getTitle())
                .userId(util.getUserId())
                .createdAt(util.getCreatedAt())
                .build();
    }

}
