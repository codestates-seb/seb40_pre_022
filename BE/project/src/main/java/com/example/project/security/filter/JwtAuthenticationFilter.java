package com.example.project.security.filter;

import com.example.project.member.entity.Member;
import com.example.project.security.dto.LoginDto;
import com.example.project.security.jwt.JwtTokenizer;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

// 로그인 처리를 하게될 필터 (인증의 엔트리 포인트)
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    //인증 시도
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); // 역직렬화

        // 인증 단계에 돌입하기 전 토큰
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        // authenticate를 다 통과하고 돌아오면 인증정보가 담겨있을것
        return authenticationManager.authenticate(authenticationToken);
    }

    // 성공시 authentication의 principal field에 Member객체가 할당됨. 그 이후 처리
    @SneakyThrows
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain, // 의문) 어디서 사용되는가
                                            Authentication authResult) {
        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        Member findMember = jwtTokenizer.findMember(member.getEmail());
        jwtTokenizer.saveRefreshToken(refreshToken, findMember.getEmail(), findMember.getMemberId()); // 리프레시 토큰 저장

        String encodedRefreshToken = URLEncoder.encode(refreshToken, "UTF-8");
        Cookie cookie = new Cookie("RefreshToken", encodedRefreshToken);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        Cookie mbCookie = new Cookie("MemberId", String.valueOf(findMember.getMemberId()));
        mbCookie.setPath("/");
        mbCookie.setHttpOnly(true);

        response.addCookie(cookie);
        response.addCookie(mbCookie);

        response.setHeader("Authorization", "Bearer " + accessToken);
//        response.setHeader("Refresh", refreshToken);
//        this.getSuccessHandler().onAuthenticationSuccess(request,response,authResult); - 오류 잡기
    }

    // accessToken 생성
    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    // refreshToken 생성
    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
