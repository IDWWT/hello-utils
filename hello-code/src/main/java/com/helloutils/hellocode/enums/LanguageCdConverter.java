package com.helloutils.hellocode.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class LanguageCdConverter implements AttributeConverter<LanguageCd, String> {
    @Override
    public String convertToDatabaseColumn(LanguageCd attribute) {
        if(attribute == null) {
            return null;
        }
        return attribute.getLanguageCode();
    }

    @Override
    public LanguageCd convertToEntityAttribute(String dbData) {
        if(dbData == null){
            return null;
        }
        return LanguageCd.ofCode(dbData);
    }
}
