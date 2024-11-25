package com.helloutils.hellocode.request;

import com.helloutils.hellocode.enums.CategoryCd;
import com.helloutils.hellocode.enums.LanguageCd;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UtilEdit {


    private String title;


    private String description;


    private String code;


    private LanguageCd languageCd;


    private CategoryCd categoryCd;

    @Builder
    public UtilEdit(String title, String description, String code, LanguageCd languageCd, CategoryCd categoryCd) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.languageCd = languageCd;
        this.categoryCd = categoryCd;
    }

}
