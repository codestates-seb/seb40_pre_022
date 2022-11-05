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
    public static class Post {

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
        private MemberForMyPage member;
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


    /**
     * 사용자 패스워드 초기화를 위한 클라이언트 request DTO
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResetPasswordDto{
        @Email
        @NotBlank(message = "이메일은 공백이 아니여야 합니다.")
        private String email;
    }

    /**
     * 사용자 패스워드 초기화 관련 내용을 담은 mail DTO
     */

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResetPasswordMail{
        private String address;
        private String title;
        private String body;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class MemberForMyPage{
        private long memberId;
        private String name;
        private String image;
    }
}
