package com.example.project.answer.dto;

import com.example.project.member.entity.Member;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class AnswerDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post{
        private long memberId;

        @NotBlank
        private String body;

        private long questionId;

        public Member getMember(){
            Member member = new Member();
            member.setMemberId(memberId);
            return member;
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch{

        private long memberId;      // 수정하려는 사용자
        private long answerId;
        private long questionId;

        private String body;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    public static class AnswerVotePatch {
        private long memberId;
        private long answerId;      // answerId를 통해 연결된 Vote를 가져오기 위해 사용.
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class AcceptPatch{
        private long memberId;
        private long questionId;
        private long answerId;
    }

    @Getter
    @Setter
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

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class VoteResponse{
        private int voteCheck; // -1,0,1 로 좋아요 싫어요 상태 구분.
        private int voteCount; // 추천 수.
    }

    @Getter
    @Setter
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
}
