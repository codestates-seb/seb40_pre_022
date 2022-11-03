package com.example.project.member.controller;

import com.example.project.answer.dto.AnswerDto;
import com.example.project.dto.SingleResponseDto;
import com.example.project.member.dto.MemberDto;
import com.example.project.member.entity.Member;
import com.example.project.member.mapper.MemberMapper;
import com.example.project.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
@Validated
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;


    /**
     * 기능 : 회원가입
     */
    @PostMapping("/signup")
    public ResponseEntity postMember(@RequestBody MemberDto.Post memberPostDto){

        Member result = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));

        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponseDto(result)), HttpStatus.CREATED);
    }

    /**
     * 기능 : 회원 정보 수정
     */
    @PatchMapping("/{member_Id}")
    public ResponseEntity patchMember(@PathVariable("member_Id") long memberId,
                                      @RequestBody MemberDto.Patch memberPatchDto){

        Member result = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponseDto(result)),HttpStatus.OK);
    }

    /**
     * 기능 : 마이페이지
     */
    @GetMapping("/{member_Id}")
    public ResponseEntity getMember(@PathVariable("member_Id") long memberId) {

        Member result = memberService.getMember(memberId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMyPageResponse(result)),HttpStatus.OK);
    }

    /**
     * 기능 : 회원 정보 삭제
     */
    @DeleteMapping("/{user_id}/{username}")
    public ResponseEntity deleteMember(@PathVariable("user_id") long userId,
                                    @PathVariable("username") long username){

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
