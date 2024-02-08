package com.helloutils.hellocode.domain;

import com.helloutils.hellocode.enums.CategoryCd;
import com.helloutils.hellocode.enums.CategoryCdConverter;
import com.helloutils.hellocode.enums.LanguageCd;
import com.helloutils.hellocode.enums.LanguageCdConverter;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Util {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Column(length = 3000)
    private String code;

    @ManyToOne
    @JoinColumn
    private User user;

    @Convert(converter = LanguageCdConverter.class)
    private LanguageCd languageCd;

    @Convert(converter = CategoryCdConverter.class)
    private CategoryCd categoryCd;

    private LocalDateTime createdAt;

    @Builder
    public Util(String title,
                String description,
                String code,
                User user,
                LanguageCd languageCd,
                CategoryCd categoryCd) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.user = user;
        this.languageCd = languageCd;
        this.categoryCd = categoryCd;
        this.createdAt = LocalDateTime.now();
    }
}

