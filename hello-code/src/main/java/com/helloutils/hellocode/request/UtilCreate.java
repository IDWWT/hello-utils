package com.helloutils.hellocode.request;

import com.helloutils.hellocode.enums.CategoryCd;
import com.helloutils.hellocode.enums.LanguageCd;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Getter
@Setter
@ToString
public class UtilCreate {

    private String title;
    private String description;
    private String code;
    private LanguageCd languageCd;
    private CategoryCd categoryCd;
    private LocalDateTime createdAt;
    private String userId;

    @Builder
    public UtilCreate(String title, String description, String code, String userId, LanguageCd languageCd, CategoryCd categoryCd) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.languageCd = languageCd;
        this.categoryCd = categoryCd;
        this.userId = userId;
        this.createdAt = LocalDateTime.now();
    }
}
