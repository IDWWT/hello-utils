package com.helloutils.hellocode.response;

import com.helloutils.hellocode.domain.Util;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UtilResponse {

    private final Long id;
    private final String title;
    private final String description;
    private final String code;

    // 생성자 오버로딩
    public UtilResponse(Util util) {
        this.id = util.getId();
        this.title = util.getTitle();
        this.description = util.getDescription();
        this.code = util.getCode();
    }

    @Builder
    public UtilResponse(Long id, String title, String description, String code) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.code = code;
    }
}
