package com.helloutils.hellocode.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.helloutils.hellocode.domain.Util;
import com.helloutils.hellocode.enums.CategoryCd;
import com.helloutils.hellocode.enums.LanguageCd;
import com.helloutils.hellocode.repository.UtilRepository;
import org.json.JSONArray;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = UtilControllerTest.class)
@AutoConfigureMockMvc
public class UtilControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UtilRepository utilRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @AfterEach
    void clean() {
        utilRepository.deleteAll();
    }

    @Test
    @DisplayName("Util 단건 조회")
    void test1() throws Exception {
        //given
        Util util = Util.builder()
                .title("제목")
                .description("설명")
                .code("hello")
                .userId(1L)
                .languageCd(LanguageCd.JAVA)
                .categoryCd(CategoryCd.FORMAT)
                .build();
        utilRepository.save(util);

        //expected
        mockMvc.perform(get("/utils/{userId}", util.getUtilId())
                    .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(util.getUtilId()))
                .andExpect(jsonPath("$.title").value("제목"))
                .andExpect(jsonPath("$.description").value("hello"))
                .andDo(print());
    }
}
