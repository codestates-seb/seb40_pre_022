package com.example.project.security.filter;

import com.example.project.security.jwt.JwtTokenizer;
import com.example.project.security.utils.MemberAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

// request 요청시 맞는 필터만 실행됨. request당 하나
// 토큰으로부터 parse해서 claim을 얻은다음 authentication객체에 넣어서 context에 저장하기 위함
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final MemberAuthorityUtils authorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // request에서 claim을 얻어옴.
        Map<String, Object> claims = verifyJws(request);
        // 이를 바탕으로 Authentication 생성
        setAuthenticationToContext(claims);

        filterChain.doFilter(request, response);
    }

    // (6)
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    // 서버가 생성해서 준 jwt가 다시 request로 돌아왔을 경우 검증
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    // Authentication 객체를 SecurityContext에 저장
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username"); // loginDto에서 설정한 이름
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles")); // security를 위한 권한정보
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
