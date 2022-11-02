package com.example.project.answer.dto;

import com.example.project.dto.MultiResponseDto;
import com.example.project.member.entity.Member;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class AnswerDto {



    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{

        @NotBlank
        private String body;

    }

    //답변 수정을 위한 requestBody

    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{

        private long answerId;
        private String body;

    }

    //답변 추천수 변경을 위한 requestBody
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AnswerVotePatch {

        private long answerId;      // answerId를 통해 연결된 Vote를 가져오기 위해 사용.

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AcceptPatch{
        private long memberId;
        private long questionId;
        private long answerId;
    }

    //답변 응답을 위한 responseBody
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private long answerId;
        private String body;
        private int voteCount;
        private int isAccepted;                 // 답변 채택 여부
        private AnswerMemberResponse member;    // answerMemberResponse를 member로 선언, Front에서 사용시 member로 사용할 수 있도록 함.
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    //답변 추천수 변경을 위한 responseBody
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class VoteResponse{
        private int voteCheck; // -1,0,1 로 좋아요 싫어요 상태 구분.
        private int voteCount; // 추천 수.
    }

    //답변 응답에 Member의 필요응답 필드만 돌려주기 위함
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AnswerMemberResponse{
        private String name;
        private String email;
        private String image;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AcceptResponse {
        private int isAccepted;
    }

    public static class AnswerListResponse{
        private MultiResponseDto answerList;
    }
}
