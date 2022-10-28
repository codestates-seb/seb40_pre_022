package com.example.project.answer.dto;

import com.example.project.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

        private long memberId;
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
        private int voteCheck;      // vote==1 좋아요 , vote== -1 싫어요. vote==0이면 없는것으로 처리.
                                    // 이렇게 하면 따로 갯수처리 안하고 value값 sum으로 처리해서 사용가능.
    }

    @Getter
    @AllArgsConstructor
    public static class AcceptPatch{
        private long memberId;
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private long answerId;
        private String body;
        private int voteCount;
        private Member member;
        // password는 어떻게 되는지 나중에 처리할지??

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class VoteResponse{
        private int voteCheck; // -1,0,1 로 좋아요 싫어요 상태 구분.
        private int voteCount; // 추천 수.
    }
}
