package com.example.project.security.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

/**
 * security를 위한 권한 생성, db 테이블 관리를 위한 권한 생성
 */
@Component
public class MemberAuthorityUtils {

    @Value("${mail.address.admin}")
    private String adminMailAddress;

    // 테이블을 위한 관리자 권한 목록
    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
    // 테이블을 위한 유저 권한 목록
    private final List<String> USER_ROLES_STRING = List.of("USER");

    // security를 위한 관리자 권한 목록
    private final List<GrantedAuthority> ADMIN_ROLES =
            AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER");

    // security를 위한 관리자 권한 목록
    private final List<GrantedAuthority> USER_ROLES =
            AuthorityUtils.createAuthorityList("ROLE_USER");

    //db에서 권한목록을 조회해서 security를 위한 권한 정보 생성
    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // (2)
                .collect(Collectors.toList());
        return authorities;
    }

    // DB 저장 전 이 메서드를 서비스단에서 호출하면된다.
    public List<String> createRoles(String email){
        if(email.equals(adminMailAddress))
            return ADMIN_ROLES_STRING;
        return USER_ROLES_STRING;
    }
}

