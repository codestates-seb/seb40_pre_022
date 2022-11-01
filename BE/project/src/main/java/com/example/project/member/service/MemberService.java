package com.example.project.member.service;

import com.example.project.member.entity.Member;
import com.example.project.member.repository.MemberRepository;
import com.example.project.security.utils.MemberAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberAuthorityUtils authorityUtils;



    // 1. 회원가입 - checked v
    public Member createMember(Member member){
        verifyExistMember(member.getEmail());
        //2. 비밀번호 암호화
        String encyptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encyptedPassword);

        //3. Role DB에 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    // 2. 멤버 정보 수정
    public Member updateMember(Member member){

        Member findMember = findExistMember(member.getMemberId());

        //2. member의 비밀번호 암호화 과정

        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable((member.getPassword()))
                .ifPresent(password -> findMember.setPassword(password));

        return memberRepository.save(findMember);
    }

    // 3. 멤버 정보 불러오기
    public Member getMember(long memberId){

        return findExistMember(memberId);
    }

    // 4. 멤버 삭제 - * memberstatus이용 가능한지 생각해보기
    public void deleteMember(long memberId){

        Member member = findExistMember(memberId);

        memberRepository.delete(member);
    }

    // 멤버가 존재하는지 여부. 존재시 에러 던짐
    public void verifyExistMember(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if(member.isPresent())
            throw new RuntimeException();
    }

    // 존재하는 멤버 찾음. 없을시 에러 던짐
    public Member findExistMember(long memberId){
        Optional<Member> member = memberRepository.findById(memberId);
        Member findMember = member.orElseThrow(()->new RuntimeException());
        return findMember;
    }

    public Member findExistMemberByEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        Member findMember = member.orElseThrow(()->new RuntimeException());
        return findMember;
    }

    public void DoesMemberExist(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if(!member.isPresent())
            throw new RuntimeException();
    }
}
