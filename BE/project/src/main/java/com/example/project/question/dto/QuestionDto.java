package com.example.project.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;
// 수정 - private 지정자 : ver 1.1
public class QuestionDto {

    /**
     * request에서 질문 '등록'을 위한 데이터를 담아오는 DTO
     */
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {

        @NotBlank(message = "질문의 제목은 공백일 수 없습니다.")
        private String title;

        @NotBlank(message = "질문의 내용은 공백일 수 없습니다.")
        private String body;

        private List<QuestionTagDto> questionTags;

    }

    /**
     * request에서 질문 '수정'을 위한 데이터를 담아오는 DTO
     */
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {

        @Positive
        private long questionId;

        @NotBlank(message = "질문의 제목은 공백일 수 없습니다.")
        private String title;

        @NotBlank(message = "질문의 내용은 공백일 수 없습니다.")
        private String body;

        private List<QuestionTagDto> questionTags;

    }

    /**
     * response에 질문 '상세페이지'를 위한 데이터를 담는 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private long questionId;
        private String title;
        private String body;
        private int voteCount;
        private int viewCount;
        private QuestionMemberDto member;  // * 놓치지 말 것 (mapper에서 name, email, image userStatus만 담아야함 -> 생성자생성)
        private List<QuestionAnswerDto> answers;
        private List<QuestionTagDto> questionTags;  // * 놓치지 말 것 (mapper에서 tagName만 담아야함 -> 생성자 생성)
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    /**
     * response에 질문 '리스트'를 위한 데이터를 담는 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionListResponse {

        private long questionId;
        private String title;
        private String body;
        private int voteCount;
        private int viewCount;
        private QuestionMemberDto member; // * mapper에서 name, email, image만 담아야 함 -> 생성자 생성)
        private List<QuestionTagDto> questionTags; // tagName만 가져오기
        private int answerCount;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    /**
     * response에 질문 '수정'를 위한 데이터를 담는 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionForUpdateResponse {

        private long questionId;
        private String title;
        private String body;
        private List<QuestionTagDto> questionTags; // name만 골라오기.

    }

    /**
     * request에서 질문 추천, 비추천을 위한 데이터를 담아오는 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionVotePatch {
        private long memberId;

        @Positive
        private long questionId;
    }

    /**
     * response에 질문 '추천, 비추천'를 위한 데이터를 담는 DTO
     * -1 , 0, 1 의 숫자가 좋아요의 상태를 표현할 것
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionVoteResponse {

        private int voteCheck;
        private int voteCount;

    }

    /**
     * response에 questionTag 객체 자체가 아닌 questionTagName만 빼서 담기 위한 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionTagDto {
        private String questionTagName;
    }

    /**
     * response에 필요한 member정보만 담기 위한 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionMemberDto {
        private long memberId;              // All question memberId 출력을 위함.
        private String name;
        private String email;
        private String image;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionAnswerDto{
        private long answerId;
        private String body;
        private int voteCount;
        private int isAccepted;
        private QuestionMemberDto member;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}