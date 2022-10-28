package com.example.project.answer.dto;

import com.example.project.member.dto.MemberDto;
import com.example.project.member.entity.Member;
import com.example.project.vote.entity.Vote;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.Optional;

public class AnswerDto {
    @Getter
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
    @AllArgsConstructor
    public static class Patch{

        private long memberId;
        private long answerId;

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
//        private MemberDto.OtherResponse member;
        // member를 그대로 보내는 것은 Entity를 보내는 것이므로, 위와 같이 처리함.



    }
}
