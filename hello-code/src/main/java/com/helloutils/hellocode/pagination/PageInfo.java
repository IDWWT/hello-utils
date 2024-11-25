package com.helloutils.hellocode.pagination;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class PageInfo {
    private int page;
    private int size;
    private Long totalElements;
    private int totalPages;

    public PageInfo(PageInfo pageInfo) {
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    @Builder
    public PageInfo(
        int page,
        int size,
        Long totalElements,
        int totalPages
    ) {
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages= totalPages;
    }
}
