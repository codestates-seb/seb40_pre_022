package com.example.project.controller;

import com.example.project.member.dto.MemberDto;
import com.example.project.member.entity.Member;
import com.example.project.member.mapper.MemberMapper;
import com.example.project.member.repository.MemberRepository;
import com.example.project.member.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.http.MediaType.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private ObjectMapper objectMapper;


    @Test
    @DisplayName("회원 post 테스트")
    void test1() throws Exception {
        MemberDto.MemberPostDto memberPostDto = MemberDto.MemberPostDto.builder()
                .name("김지수")
                .email("skru@naver.com")
                .password("323255")
                .build();

        String json = objectMapper.writeValueAsString(memberPostDto);

        mockMvc.perform(post("/signup")
        .accept(APPLICATION_JSON)
        .contentType(APPLICATION_JSON)
        .content(json)
        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value(memberPostDto.getName()))
                .andExpect(jsonPath("$.email").value(memberPostDto.getEmail()))
                .andExpect(jsonPath("$.password").value(memberPostDto.getPassword()))
                .andDo(print());
    }


    @Test
    @DisplayName("회원 patch 테스트")
    void test2() throws Exception {
        MemberDto.MemberPatchDto memberPatchDto = MemberDto.MemberPatchDto.builder()
                .memberId(1L)
                .name("김지수")
                .password("32345")
                .build();

        String json = objectMapper.writeValueAsString(memberPatchDto);

        mockMvc.perform(patch("/{user_id}/{username}", memberPatchDto.getMemberId(), memberPatchDto.getName())
        .accept(APPLICATION_JSON)
        .contentType(APPLICATION_JSON)
        .contentType(json)
        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.memberId").value(memberPatchDto.getMemberId()))
                .andExpect(jsonPath("$.name").value(memberPatchDto.getName()))
                .andExpect(jsonPath("$.password").value(memberPatchDto.getPassword()))
                .andDo(print());

    }


    @Test
    @DisplayName("회원 get 테스트")
    void test3() throws Exception {
        Member member = Member.builder()
                .name("김지수")
                .email("skdfls@naver.com")
                .password("323456")
                .build();

        memberRepository.save(member);

        mockMvc.perform(get("/{user_id}/{username}", member.getMemberId(), member.getName())
        .accept(APPLICATION_JSON)
        .contentType(APPLICATION_JSON)
        )
                .andExpect(jsonPath("$.questionId").value(member.getQuestions()))
                .andDo(print());

    }


}
