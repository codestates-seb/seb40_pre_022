package com.example.project.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Getter

public class MemberDto {
//    public static class OtherResponse{
//        // just for test
//        // 다른 애그리거트에서 member를 response 주고싶을때.
//
//        private String name;
//        private String email;
//        private String image;
//    }
// + 의견 -> member엔티티에 생성자 만들어서 mapper에서 변환하는게 역할상 좋아보입니다. 개인적인 의견입니다.
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberPostDto{

        private String name;
        @Email
        private String email;
        private String password;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberPatchDto{
        private long memberId;
        private String name;
        private String password;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberResponseDto{
        private long memberId;
        private String name;
        private String email;
        private String password;
    }
}
