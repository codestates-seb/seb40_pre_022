package com.example.project.security.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MemberAuthorityUtils {

    @Value("${mail.address.admin")
    private String adminMailAddress;

    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
    private final List<String> USER_ROLES_STRING = List.of("USER");

    // 관리자용 권한 목록 생성
    private final List<GrantedAuthority> ADMIN_ROLES =
            AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER");

    // 일반 유저용 권한 목록 생성
    private final List<GrantedAuthority> USER_ROLES =
            AuthorityUtils.createAuthorityList("ROLE_USER");

    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // (2)
                .collect(Collectors.toList());
        return authorities;
    }

    // DB 저장용
    public List<String> createRoles(String email){
        if(email.equals(adminMailAddress))
            return ADMIN_ROLES_STRING;
        return USER_ROLES_STRING;
    }
}

/*
인증 매카니즘

- 회원정보의 저장 - 회원가입
1) 유저디테일매니저 (db에 유저 정보 저장)
    인메모리 - 코드레벨에서 생성 (테스트위함)
    디비 - 실제 서비스 구현시 디비에 저장하는 로직 필요

- 인증 방법론 - 로그인, 인가
1) http basic
    이 경우 http basic인증으로써 UsernamePasswordAuthenticationFilter가 필요
    로그인이 매번 진행되어야함 ??
    유저 디테일 매니저를 통해 로그인 정보를 불러온다.

2) 세션 (서버의 세션에 유저의 로그인 정보 저장)
    상태를 유지하기 위한 방법론
    매번 아이디 패스워드를 입력하는 것이 아닌 세션으로 저장한다.
    세션 id를 클라이언트에게 전달, 추후 세션 id로 인증,인가

3) 토큰(jwt) - 하고자 하는것
    상태를 유지하기 위한 방법론
    인증 이후 토큰(access token , refresh token) 발급
    토근 유효기간동안 로그인

- 3번 토큰을 위해 필요한 도구들
    JwtTokenizer - 토큰을 생성하고 검증한다.
        header - payload - signature
    CustomAuthorityUtil
        유저의 권한 정보를 설정함
    SecurityConfiguration
        보안 관련 설정들을 bean으로
 */