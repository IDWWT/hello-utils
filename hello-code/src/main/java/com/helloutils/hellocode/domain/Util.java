package com.helloutils.hellocode.domain;

import com.helloutils.hellocode.enums.CategoryCd;
import com.helloutils.hellocode.enums.DeleteYn;
import com.helloutils.hellocode.enums.LanguageCd;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Column(name = "user_id", length = 36)
    private String userId;

    @Enumerated(EnumType.STRING)
    private LanguageCd languageCd;

    @Enumerated(EnumType.STRING)
    private CategoryCd categoryCd;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private DeleteYn deleteYn;

    @Builder
    public Util(String title,
                String description,
                String code,
                String userId,
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

    public void delete(DeleteYn deleteYn) {
        this.deleteYn = deleteYn;
    }

    public UtilEditor.UtilEditorBuilder toEditor() {
        return UtilEditor.builder()
                .title(title)
                .description(description)
                .code(code)
                .languageCd(languageCd)
                .categoryCd(categoryCd);
    }

    public void edit(UtilEditor utilEditor) {
        title = utilEditor.getTitle();
        description = utilEditor.getDescription();
        code = utilEditor.getCode();
        languageCd = utilEditor.getLanguageCd();
        categoryCd = utilEditor.getCategoryCd();
    }
}
