package com.example.project.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 로그인 시 request에서 필요 정보를 담아올 DTO
 */
@Getter
public class LoginDto {
    private String username;
    private String password;
}
