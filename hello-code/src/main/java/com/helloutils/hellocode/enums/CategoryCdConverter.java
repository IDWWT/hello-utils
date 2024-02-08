package com.helloutils.hellocode.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class CategoryCdConverter implements AttributeConverter<CategoryCd, String> {
    @Override
    public String convertToDatabaseColumn(CategoryCd attribute) {
        if(attribute == null) {
            return null;
        }
        return attribute.getCategoryCode();
    }

    @Override
    public CategoryCd convertToEntityAttribute(String dbData) {
        if(dbData == null){
            return null;
        }
        return CategoryCd.ofCode(dbData);
    }
}
