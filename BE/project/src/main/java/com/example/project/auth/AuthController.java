package com.example.project.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @DeleteMapping("/members/logout")
    public void logoutMember(@CookieValue(name = "RefreshToken") String refreshToken,
                             @CookieValue(name = "MemberId") String memberId,
                             HttpServletResponse response){
        log.info("{}",response);
        authService.logoutMember(refreshToken);
        Cookie cookie = new Cookie("RefreshToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        Cookie mbCookie = new Cookie("MemberId", null);
        mbCookie.setMaxAge(0);
        mbCookie.setPath("/");

        response.addCookie(cookie);
        response.addCookie(mbCookie);
    }
}