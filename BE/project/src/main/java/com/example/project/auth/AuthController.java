package com.example.project.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    /**
     * 로그아웃 핸들러 메서드
     * @param refreshToken - 쿠키게 담긴 리프레시 토큰
     * @param memberId - 쿠키에 담긴 유저 정보
     * @param response - 돌려줄 response
     */
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

    /**
     * 리프레시 토큰 리이슈 핸들러 메서드
     * 1. 리프레스 토큰을 쿠키에서 받아와서
     * 2. 액세스, 리프레시 토큰 재생성 후
     * 3. 리스폰스에 추가해서 준다.
     */
    @GetMapping("/members/refresh")
    public void refreshTokenReissue(@CookieValue(name = "RefreshToken") String refreshToken,
                                    @CookieValue(name = "MemberId") String memberId,
                                    HttpServletResponse response){

        String reIssueAccessToken = authService.reIssueAccessToken(refreshToken);
        String reIssueRefreshToken = authService.reIssueRefreshToken(refreshToken);

        Cookie cookie = new Cookie("RefreshToken" , reIssueRefreshToken);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        Cookie mbCookie = new Cookie("MemberId", memberId);
        mbCookie.setPath("/");
        mbCookie.setHttpOnly(true);

        response.setHeader("Authorization", "Bearer " + reIssueAccessToken);
        response.addCookie(cookie);
        response.addCookie(mbCookie);
    }
}