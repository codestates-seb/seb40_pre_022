package com.example.project.security.config;

import com.example.project.security.filter.JwtAuthenticationFilter;
import com.example.project.security.filter.JwtVerificationFilter;
import com.example.project.security.jwt.JwtTokenizer;
import com.example.project.security.utils.MemberAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

// 보안 구성. - 어떠한 방법론들을 이용할 것인가.
@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;

    // 1. DelegatingFilterProxy가 호출하는 Filter. 아래 설정값들을 실행한다.
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()// 동일 출처만 렌더링 허용. h2는 tag를 이용하기 때문
                .and()
                .csrf().disable() // 로컬테스트시에만.
                .cors(withDefaults()) // corsConfigurationSource bean을 이용함 = cors필터 적용
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable() // csr 방식이기 때문에.
                .httpBasic().disable() // 토큰을 이용할것이기 때문에. basic은 header에 id/pw 다 줌
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/login").permitAll() // 1. 로그인 : EVERYONE
                        //member
                        .antMatchers(HttpMethod.POST, "/members/signup").permitAll() // 2. 회원가입 : EVERYONE
                        .antMatchers(HttpMethod.GET, "/members").hasAnyRole("USER", "ADMIN") // 2. 회원정보 접근 : USER, ADMIN
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER") // 2. 회원 삭제 : USER
                        .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER") // 2. 회원 정보 수정 : USER
                        //answer
                        .antMatchers(HttpMethod.POST, "/questions/*/answers").hasRole("USER") // 3. 답변 등록 : USER
                        .antMatchers(HttpMethod.PATCH, "/questions/*/answers/**").hasRole("USER") // 3. 답변 수정관련 : USER
                        .antMatchers(HttpMethod.DELETE, "/questions/*/answers/**").hasRole("USER") // 3. 답변 삭제
                        //question
                        .antMatchers(HttpMethod.GET, "/questions/edit/*").hasRole("USER") // 4. 질문 수정을 위한 불러오기 : USER, ADMIN
                        .antMatchers(HttpMethod.GET, "/questions/**").permitAll() // 4. 글 목록, 상세페이지 : EVERYONE
                        .antMatchers(HttpMethod.POST, "/questions/**").hasAnyRole("USER") // 4. 질문 생성 : USER, ADMIN
                        .antMatchers(HttpMethod.PATCH, "/questions/**").hasRole("USER") // 4. 질문 수정 : USER
                        .antMatchers(HttpMethod.DELETE, "/questions/**").hasAnyRole("USER", "ADMIN") // 4. 질문 삭제 : USER, ADMIN
                );

        return http.build();
    }

    // 2. PasswordEncoder 관련 설정 - PasswordEncoder를 구현한 객체가 DI되어 암호화 진행하게 하기 위함
    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // 3. cors 관련 설정
    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();  // Cors설정 객체생성(정책 설정)
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PATCH","DELETE"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 해당 인터페이스 구현 객체에 넣어준다.

        return source;
    }
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager =
                    builder.getSharedObject(AuthenticationManager.class);
            MemberAuthorityUtils authorityUtils = new MemberAuthorityUtils(); // **맞는지는 모르겠지만, 추가함 파라미터로 넘기기 위해

            JwtAuthenticationFilter jwtAuthenticationFilter =
                    new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class); ;
        }
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