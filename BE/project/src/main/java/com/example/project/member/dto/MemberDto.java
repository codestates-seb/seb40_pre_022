package com.example.project.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
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
    public static class Post{

        @NotBlank(message = "이름은 공백이 아니여야 합니다.")
        private String name;

        @Email
        @NotBlank(message = "이메일은 공백이 아니여야 합니다.")
        private String email;

        @NotBlank(message = "비밀번호는 공백이 아니여야 합니다.")
        private String password;
    }

    /**
     * request에서 '회원정보수정'을 위한 데이터를 담아오는 DTO
     */
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{

        @Positive
        private long memberId;

        @NotBlank(message = "이름은 공백이 아니여야 합니다.")
        private String name;

        @NotBlank(message = "비밀번호는 공백이 아니여야 합니다.")
        private String password;

        private String image;
    }
    /**
     * response에 멤버정보를 담아주기 위한 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
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
    public static class MyPageResponse{
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
    public static class AnswerResponse{
        private List<Long> answerId;
        private int answersCount;
    }

    /**
     * response에 넣기 위한 가공용 DTO
     */
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionResponse{
        private List<Long> questionId;
        private int questionsCount;


    }
}
