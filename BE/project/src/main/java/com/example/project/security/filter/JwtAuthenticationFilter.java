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

/**
 * 로그인 시 인증정보를 생성하고 확인 후 토큰을 발급해줄 필터
 * 1. AuthenticationManager - UserDetailService를 호출하여 UserDetail을 확인, 인증 여부를 파악한다.
 * 2. JwtTokenizer - 인증 성공시 토큰을 발급하는 역할을 한다.
 */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    /**
     * 입력받은 username, password를 바탕으로 인증정보를 생성하는 로직
     * 1. ObjectMapper로 request에서 loginDto로 username,password를 담는다.
     * 2. 이 정보를 가지고 '인증 전'(권한 설정이 되어 있지 않은) authenticationToken 발급
     * 3. authenticationToken을 이용하여 UserDetailsService에서 인증 정보를 받아온다.
     *          -> (내부적으로 해주기에 코드상에 보이진 않음)
     * @Return : 인증이 완료된(권한부여된) Authentication
     */
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); // 역직렬화

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    /**
     * attempt 성공시 진입하게 될 메서드.
     * 1. 인증된 Authentication의 field에서 Member정보를 가져온다.
     * 2. 가져온 member를 이용하여 액세스토큰, 리프레시 토큰을 생성한다.
     * 3. 리프레시 토큰을 데이터베이스에 저장한다. - 추후 로그아웃을 구현하기 위해
     *      -> 관련 레포지터리 접근은 jwtTokenizer에 구현해둠
     * 4. 리프레시 토큰과 memberId를 쿠키에 담는다. (쿠키 사용을 위해 해봄)
     * 5. 액세스 토큰은 헤더에 담는다.
     * method.
     */
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
        cookie.setHttpOnly(false);   // cookie 사용 이슈로 인한 true -> false 수정

        Cookie mbCookie = new Cookie("MemberId", String.valueOf(findMember.getMemberId()));
        mbCookie.setPath("/");
        mbCookie.setHttpOnly(false);    // cookie 사용 이슈로 인한 true -> false 수정

        response.addCookie(cookie);
        response.addCookie(mbCookie);

        response.setHeader("Authorization", "Bearer " + accessToken);
//        response.setHeader("Refresh", refreshToken);
        response.setHeader("refreshToken", refreshToken);
    }

    /**
     * AccessToken 생성 로직
     * @Param 인증된 Authentication의 principal field에서 찾아온 member정보
     * @Return AccessToken
     */
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

    /**
     * RefreshToken 생성 로직
     * @Param 인증된 Authentication의 principal field에서 찾아온 member정보
     * @Return RefreshToken
     */
    private String delegateRefreshToken(Member member) {

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
