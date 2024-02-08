package com.helloutils.hellocode.request;

import lombok.Builder;

public class UtilCreate {

    public String title;
    public String description;

    public String code;


    @Builder
    public UtilCreate(String title, String description, String code){
        this.title = title;
        this.description = description;
        this.code = code;
    }
}

