package com.example.project.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class LoginDto {
    private String username;
    private String password;
}
