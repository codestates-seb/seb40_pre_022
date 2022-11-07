package com.example.project.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * 로그인 시 request에서 필요 정보를 담아올 DTO
 */
@Getter
public class LoginDto {
    @NotBlank(message = "아이디는 공백이 아니여야 합니다.")
    private String username;
    @NotBlank(message = "비밀번호는 공백이 아니여야 합니다.")
    private String password;
}
