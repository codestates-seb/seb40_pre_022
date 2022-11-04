package com.example.project.member.service;

import com.example.project.exception.BusinessLogicException;
import com.example.project.exception.ExceptionCode;
import com.example.project.member.entity.Member;
import com.example.project.member.repository.MemberRepository;
import com.example.project.security.utils.MemberAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberAuthorityUtils authorityUtils;



    /**
     * 필수) member 회원가입 로직
     * 1. 이미 등록된 이메일인지 확인한다.
     * 2. 비밀번호를 암호화한다.
     * 3. 이메일로부터 role을 파악하여 부여한다.
     * 4. 저장한다.
     */
    public Member createMember(Member member){
        verifyExistMember(member.getEmail());
        //2. 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        //3. Role DB에 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    /**
     * 필수) member 정보수정 로직
     * 1. DB에서 정보를 가져온다.
     * 2. 변경할 요소들을 변경한다.
     *      -> 비밀번호의 경우 암호화 필요
     * 4. 저장한다.
     */
    // 2. 멤버 정보 수정
    public Member updateMember(Member member){

        Member findMember = findExistMember(member.getMemberId());

        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> {
                    String encryptedPassword = passwordEncoder.encode(password);
                    findMember.setPassword(encryptedPassword);
                });
        Optional.ofNullable(member.getImage())
                .ifPresent(image -> findMember.setImage(image));

        return memberRepository.save(findMember);
    }

    /**
     * 필수) member 마이페이지 접근 로직
     * 1. DB에서 정보를 가져온다.
     * 2. 반환한다.
     */
    @Transactional(readOnly = true)
    public Member getMember(long memberId){

        return findExistMember(memberId);
    }

    /**
     * 필수) member 회원 탈퇴 로직
     * 1. 멤버정보를 가져온다.
     * 2.
     */
    public void deleteMember(long memberId){

        Member member = findExistMember(memberId);

        memberRepository.delete(member);
    }

    /**
     * 도구) member 정보가 존재하면 에러를 던지는 메서드 - 회원 가입시 필요
     */
    public void verifyExistMember(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if(member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    /**
     * 도구) member 정보가 존재하지 않으면 에러, 존재하면 member를 반환하는 메서드 - 정보수정시 필요
     */
    @Transactional(readOnly = true)
    public Member findExistMember(long memberId){
        Optional<Member> member = memberRepository.findById(memberId);
        Member findMember = member.orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    /**
     * 도구) email정보로 유저를 찾는 메서드 - email은 unique값이기에
     * 로그인해서 토큰을 분석해 얻은 email정보를 활용하기 위함
     */
    @Transactional(readOnly = true)
    public Member findExistMemberByEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        Member findMember = member.orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    /**
     * 도구) member정보가 존재하지 않으면 예외를 던지는 메서드
     *  -> 글, 답변 작성시 존재하지 않는 멤버면 작성 불가를 구현하기위해 : 로직적으로 필요하다고 생각했음. (잘못된 로그인 방지)
     */
    public void DoesMemberExist(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if(!member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
    }
}
