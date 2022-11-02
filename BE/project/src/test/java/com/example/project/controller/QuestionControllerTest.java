package com.example.project.controller;

import com.example.project.question.dto.QuestionDto;
import com.example.project.question.entity.Question;
import com.example.project.question.mapper.QuestionMapper;
import com.example.project.question.repository.QuestionRepository;
import com.example.project.question.service.QuestionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class QuestionControllerTest {}

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionMapper questionMapper;

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


    @Test
    @DisplayName("질문 수정 테스트")
    void test2() throws Exception { // 실패됨 질문하기

        Question question = Question.builder()
                .questionId(0L)
                .title("첫번째 질문 제목")
                .body("첫번째 질문 내용")
                .build();

        questionRepository.save(question);


        QuestionDto.QuestionPatchDto questionPatchDto = QuestionDto.QuestionPatchDto.builder()
                .title("제목 수정할게요.")
                .body("질문있습니다.")
                .build();

        mockMvc.perform(patch("/questions/{question_Id}", questionPatchDto.getQuestionId())
                .contentType(APPLICATION_JSON)
        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.title").value(questionPatchDto.getTitle()))
                .andExpect(jsonPath("$.data.body").value(questionPatchDto.getBody()))
                .andDo(print());

    }

    @Test
    @DisplayName("질문 상세 페이지를 위한 get 테스트")
    void test3() throws Exception {
        Question question = Question.builder()
                .title("첫번째 질문")
                .body("첫번째 내용")
                .build();

        questionRepository.save(question);


        mockMvc.perform(get("/questions/{question_Id}", question.getQuestionId())
                .accept(APPLICATION_JSON)
                .contentType(APPLICATION_JSON)
        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.questionId").value(question.getQuestionId()))
                .andExpect(jsonPath("$.data.title").value(question.getTitle()))
                .andExpect(jsonPath("$.data.body").value(question.getBody()))
                .andDo(print());

    }



}
