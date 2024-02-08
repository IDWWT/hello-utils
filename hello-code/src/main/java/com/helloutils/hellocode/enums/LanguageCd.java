package com.helloutils.hellocode.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor
public enum LanguageCd {
    JAVASCRIPT("JS"),
    TYPESCRIPT("TS"),
    PYTHON("PY"),
    JAVA("JA");

    private final String languageCode;

    public static LanguageCd ofCode(String dbData) {
        return Arrays.stream(LanguageCd.values())
                .filter(value -> value.getLanguageCode().equals(dbData))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException("Not exist programming language code."));
    }
}
