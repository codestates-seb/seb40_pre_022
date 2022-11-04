package com.example.project.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter

public class MemberDto {
    /**
     * request에서 '회원가입'을 위한 데이터를 담아오는 DTO
     */
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {

        @NotBlank
        private String name;
        @Email
        private String email;
        @NotBlank
        private String password;
    }

    /**
     * request에서 '회원정보수정'을 위한 데이터를 담아오는 DTO
     */
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private long memberId;
        @NotBlank
        private String name;
        @NotBlank
        private String password;
        private String image;
    }

    /**
     * response에 멤버정보를 담아주기 위한 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long memberId;
        private String name;
        private String email;
        private String password;
        private String image;
    }

    /**
     * 마이페이지를 위한 response에 멤버정보를 담아주기 위한 DTO
     */
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MyPageResponse {
        private QuestionResponse questions;
        private AnswerResponse answers;
    }

    /**
     * response에 넣기 위한 가공용 DTO
     */
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AnswerResponse {
        private List<Long> answerIds;
        private int answersCount;
    }

    /**
     * response에 넣기 위한 가공용 DTO
     */
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionResponse {
        private List<QuestionForMyPage> questionList;
        private int questionsCount;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionForMyPage {
        private long questionId;
        private String title;
    }
}
