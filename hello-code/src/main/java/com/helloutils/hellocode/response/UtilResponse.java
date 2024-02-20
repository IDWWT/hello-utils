package com.helloutils.hellocode.response;

import com.helloutils.hellocode.domain.Util;
import com.helloutils.hellocode.enums.CategoryCd;
import com.helloutils.hellocode.enums.LanguageCd;
import lombok.Builder;
import lombok.Getter;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Getter
public class UtilResponse {

    private final Long utilId;
    private final String title;
    private final String description;
    private final String code;
    private final Long userId;
    private final LanguageCd languageCd;
    private final CategoryCd categoryCd;
    private final LocalDateTime createdAt;

    static public UtilResponse convertToResponse(Util util) {
        return new UtilResponse(util);
    }

    public UtilResponse(Util util) {
        this.utilId = util.getUtilId();
        this.title = util.getTitle();
        this.description = util.getDescription();
        this.code = util.getCode();
        this.userId = util.getUserId();
        this.languageCd = util.getLanguageCd();
        this.categoryCd = util.getCategoryCd();
        this.createdAt = util.getCreatedAt();
    }

    @Builder
    public UtilResponse(
        Long utilId,
        String title,
        String description,
        String code, Long userId,
        LanguageCd languageCd,
        CategoryCd categoryCd,
        LocalDateTime createdAt
    ) {
        this.utilId = utilId;
        this.title = title;
        this.description = description;
        this.code = code;
        this.userId = userId;
        this.languageCd = languageCd;
        this.categoryCd = categoryCd;
        this.createdAt = createdAt;
    }
}
