package com.example.project.member.service;

import com.example.project.member.entity.Member;
import com.example.project.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // 1. 회원가입
    public Member createMember(Member member){
//        findExistMember(member.getMemberId());
        //2. 비밀번호 암호화
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
    public void VerifyExistMember(String email){
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
}
