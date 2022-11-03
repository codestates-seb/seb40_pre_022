package com.example.project.answer.dto;

import com.example.project.dto.MultiResponseDto;
import com.example.project.member.entity.Member;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class AnswerDto {

    /**
     * request에서 답변 '등록'을 위한 데이터를 담아오는 DTO
     */
    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {

        @NotBlank
        private String body;

    }

    /**
     * request에서 답변 '수정'을 위한 데이터를 담아오는 DTO
     */
    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {

        private long answerId;
        private String body;

    }

    /**
     * request에서 답변 '추천'을 위한 데이터를 담아오는 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AnswerVotePatch {

        private long answerId;

    }

    /**
     * request에서 답변 '채택'을 위한 데이터를 담아오는 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AcceptPatch {
        private long memberId;
        private long questionId;
        private long answerId;
    }

    /**
     * response에 '답변 자체'를 위한 데이터를 담는 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long answerId;
        private String body;
        private int voteCount;
        private int isAccepted;
        private AnswerMemberResponse member;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    /**
     * response에 답변의 '추천,비추천'과 관련한 데이터를 담는 DTO
     * * -1 , 0, 1 의 숫자가 좋아요의 상태를 표현할 것
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class VoteResponse {
        private int voteCheck;
        private int voteCount;
    }

    /**
     * 답변 response에 돌려줄 member의 정보를 추리기 위한 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AnswerMemberResponse {
        private String name;
        private String email;
        private String image;
    }

    /**
     * response에 답변의 '채택여부' 를 담는 DTO
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AcceptResponse {
        private int isAccepted;
    }
}
