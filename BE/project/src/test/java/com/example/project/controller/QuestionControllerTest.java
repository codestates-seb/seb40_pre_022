package com.example.project.controller;

import com.example.project.question.dto.QuestionDto;
import com.example.project.question.mapper.QuestionMapper;
import com.example.project.question.service.QuestionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class QuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuestionMapper questionMapper;

    @Autowired
    private Gson gson;

    @Autowired
    private ObjectMapper objectMapper;


    @Test
    @DisplayName("질문 작성 테스트")
    void test1() throws Exception {

        QuestionDto.QuestionPostDto questionPostDto = QuestionDto.QuestionPostDto.builder()
                .title("질문입니다.")
                .body("질문있습니다.")
                .questionTags(List.of())
                .build();


        String json = objectMapper.writeValueAsString(questionPostDto);

        mockMvc.perform(post("/questions/ask/submit")
                .accept(APPLICATION_JSON)
                .contentType(APPLICATION_JSON)
                .content(json)
        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.title").value(questionPostDto.getTitle()))
                .andExpect(jsonPath("$.data.body").value(questionPostDto.getBody()))
                .andReturn();
    }



}
