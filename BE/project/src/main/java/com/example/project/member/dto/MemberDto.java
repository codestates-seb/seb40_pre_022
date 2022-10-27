package com.example.project.member.dto;

import lombok.Getter;

@Getter

public class MemberDto {
    public static class OtherResponse{
        // just for test
        // 다른 애그리거트에서 member를 response 주고싶을때.

        private String name;
        private String email;
        private String image;
    }
}
