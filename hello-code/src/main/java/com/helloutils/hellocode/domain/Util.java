package com.helloutils.hellocode.domain;

import com.helloutils.hellocode.enums.CategoryCd;
import com.helloutils.hellocode.enums.LanguageCd;
import com.helloutils.hellocode.response.UtilResponse;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Util {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long utilId;

    @Column
    private String title;

    private String description;

    @Column(length = 3000)
    private String code;

    private Long userId;

    @Enumerated(EnumType.STRING)
    private LanguageCd languageCd;

    @Enumerated(EnumType.STRING)
    private CategoryCd categoryCd;

    private LocalDateTime createdAt;

    @Builder
    public Util(String title,
                String description,
                String code,
                Long userId,
                LanguageCd languageCd,
                CategoryCd categoryCd) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.userId = userId;
        this.languageCd = languageCd;
        this.categoryCd = categoryCd;
        this.createdAt = LocalDateTime.now();
    }
}
