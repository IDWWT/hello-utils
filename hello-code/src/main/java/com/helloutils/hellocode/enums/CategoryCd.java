package com.helloutils.hellocode.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor
public enum CategoryCd {
    OK("FORMAT"),
    CALCULATE("CALCULATE");

    private final String categoryCode;

    public static CategoryCd ofCode(String dbData) {
        return Arrays.stream(CategoryCd.values())
                .filter(t -> t.getCategoryCode().equals(dbData))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException("Not exist category code."));
    }
}

