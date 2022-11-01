package com.example.project.member.controller;

import com.example.project.answer.dto.AnswerDto;
import com.example.project.dto.SingleResponseDto;
import com.example.project.member.dto.MemberDto;
import com.example.project.member.entity.Member;
import com.example.project.member.mapper.MemberMapper;
import com.example.project.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    //1. 회원가입
    @PostMapping("/signup")
    public ResponseEntity postMember(@RequestBody MemberDto.MemberPostDto memberPostDto){

        Member result = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));

        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponseDto(result)), HttpStatus.CREATED);
    }

    //2. 회원 정보 수정
    @PatchMapping("/{user_id}/{username}")
    public ResponseEntity patchMember(@PathVariable("user_id") long userId,
                                      @PathVariable("username") long username,
                                      @RequestBody MemberDto.MemberPatchDto memberPatchDto){

        Member result = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponseDto(result)),HttpStatus.OK);
    }

    //3. 회원 정보 - 마이페이지?
    @GetMapping("/{user_id}/{username}")
    public ResponseEntity getMember(@PathVariable("user_id") long userId,
                                    @PathVariable("username") long username){

        Member result = memberService.getMember(userId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponseDto(result)),HttpStatus.OK);
    }

    //4. 회원 정보 삭제
    @DeleteMapping("/{user_id}/{username}")
    public ResponseEntity deleteMember(@PathVariable("user_id") long userId,
                                    @PathVariable("username") long username){

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
