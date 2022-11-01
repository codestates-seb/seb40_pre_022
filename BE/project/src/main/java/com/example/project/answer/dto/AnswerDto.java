package com.example.project.answer.dto;

import com.example.project.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class AnswerDto {

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Post{
        private long memberId;

        @NotBlank
        private String body;

        public Member getMember(){
            Member member = new Member();
            member.setMemberId(memberId);
            return member;
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Patch{

        private long memberId;
        private long answerId;
        @NotBlank
        private String body;

        public void setAnswerId(long answerId){         // PathVariable로 받은 answerId 넣어주기 위한 Setter.
            this.answerId = answerId;
        }

    }


    @Getter
    @AllArgsConstructor
    public static class VotePatch{
        private long memberId;
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
        private int voteCount;    // voteCount를 주면되나?
        private Member member;

    }
}
