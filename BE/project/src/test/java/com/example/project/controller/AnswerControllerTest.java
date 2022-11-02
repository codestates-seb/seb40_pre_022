//package com.example.project.controller;
//
//import com.example.project.answer.dto.AnswerDto;
//import com.example.project.answer.mapper.AnswerMapper;
//import com.example.project.answer.repository.AnswerRepository;
//import com.example.project.answer.service.AnswerService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.springframework.http.MediaType.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest
//@AutoConfigureMockMvc
public class AnswerControllerTest {}
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private AnswerService answerService;
//
//    @Autowired
//    private AnswerRepository answerRepository;
//
//    @Autowired
//    private AnswerMapper answerMapper;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Test
//    @DisplayName("답변 post 테스트")
//    void test1() throws Exception{ // questionId 어떻게 불러와야 하는가?
//        AnswerDto.Post answerPostDto = AnswerDto.Post.builder()
//                .body("답변입니다.")
//                .build();
//
//        String json = objectMapper.writeValueAsString(answerPostDto);
//
//        mockMvc.perform(post("/{questionId}/answers", 0)
//                .accept(APPLICATION_JSON)
//                .contentType(APPLICATION_JSON)
//                .content(json)
//        )
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.body").value(answerPostDto.getBody()))
//                .andDo(print());
//    }
//
//    @Test
//    @DisplayName("답변 patch 테스트")
//    void test2() throws Exception {
//        AnswerDto.Patch answerPatchDto = AnswerDto.Patch.builder()
//                .memberId(0)
//                .answerId(0)
//                .body("답변 내용 수정입니다.")
//                .build();
//
//        String json = objectMapper.writeValueAsString(answerPatchDto);
//
//        mockMvc.perform(patch("/{questionId}/answers/{answerId}", 0, answerPatchDto.getAnswerId())
//                .accept(APPLICATION_JSON)
//                .contentType(APPLICATION_JSON)
//                .content(json)
//        )
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.body").value("답변 수정 입니다."))
//                .andReturn();
//    }
//}
