package com.helloutils.hellocode.pagination;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class PaginationResponse<T> {
    private final List<T> data;
    private final PageInfo pageInfo;
}
