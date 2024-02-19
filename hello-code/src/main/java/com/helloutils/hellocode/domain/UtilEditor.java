package com.helloutils.hellocode.domain;

import com.helloutils.hellocode.enums.CategoryCd;
import com.helloutils.hellocode.enums.LanguageCd;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UtilEditor {
    private final String title;

    private final String description;

    private final String code;

    private final LanguageCd languageCd;

    private final CategoryCd categoryCd;

    @Builder
    public UtilEditor(String title, String description, String code, LanguageCd languageCd, CategoryCd categoryCd) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.languageCd = languageCd;
        this.categoryCd = categoryCd;
    }
}
