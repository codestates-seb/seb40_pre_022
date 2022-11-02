package com.example.project.security.userdetails;

import com.example.project.exception.BusinessLogicException;
import com.example.project.exception.ExceptionCode;
import com.example.project.member.entity.Member;
import com.example.project.member.repository.MemberRepository;
import com.example.project.security.utils.MemberAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

//db에서 크레덴셜 조회, 권한정보 더해서 MemberDetail생성 (repository에서 정보, authorityutil을 통해 권한정보)
@Component
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final MemberAuthorityUtils authorityUtils;

    @Override
    public UserDetails loadUserByUsername(String username){
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetails(findMember);
    }

    // 인증된 멤버의 정보. 멤버(엔티티) / 유저디테일(인증된 정보를 담는 객체)
    private final class MemberDetails extends Member implements UserDetails{

        MemberDetails(Member member){
            setMemberId(member.getMemberId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        // UserDetails의 권한정보 생성
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }

    }
}
