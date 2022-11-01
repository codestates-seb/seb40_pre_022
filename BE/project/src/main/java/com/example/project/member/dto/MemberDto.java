package com.example.project.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter

public class MemberDto {
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{

        @NotBlank
        private String name;
        @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{
        private long memberId;
        @NotBlank
        private String name;
        @NotBlank
        private String password;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private long memberId;
        private String name;
        private String email;
        private String password;
    }
}
