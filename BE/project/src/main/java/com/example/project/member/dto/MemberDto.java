package com.example.project.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Getter

public class MemberDto {
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
