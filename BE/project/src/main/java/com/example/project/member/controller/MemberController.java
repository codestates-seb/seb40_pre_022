package com.example.project.member.controller;

import com.example.project.answer.dto.AnswerDto;
import com.example.project.dto.MultiResponseDto;
import com.example.project.dto.SingleResponseDto;
import com.example.project.member.dto.MemberDto;
import com.example.project.member.entity.Member;
import com.example.project.member.mapper.MemberMapper;
import com.example.project.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPostDto){

        Member result = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));

        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponseDto(result)), HttpStatus.CREATED);
    }

    /**
     * 기능 : 회원 정보 수정
     */
    @PatchMapping("/{member_Id}")
    public ResponseEntity patchMember(@PathVariable("member_Id") long memberId,
                                      @Valid @RequestBody MemberDto.Patch memberPatchDto){

        Member result = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponseDto(result)),HttpStatus.OK);
    }

    /**
     * 기능 : 마이페이지
     */
    @GetMapping("/myPage/{member_Id}")
    public ResponseEntity getMember(@PathVariable("member_Id") long memberId) {

        Member result = memberService.getMember(memberId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMyPageResponse(result)),HttpStatus.OK);
    }

    /**
     * 기능 : 유저 목록
     *
     */

    @GetMapping("/list")
    public ResponseEntity getMembers(@RequestParam int page,
                                     @RequestParam int size) {

        Page<Member> result = memberService.findMembers(page-1, size);
        List<MemberDto.MemberForMyPage> lists = result.getContent().stream()
                .map(list -> mapper.memberToMemberForMyPage(list))
                .collect(Collectors.toList());


        return new ResponseEntity(new MultiResponseDto<>(lists, result),HttpStatus.OK);
    }


    /**
     * 기능 : 회원 정보 삭제
     */
    @DeleteMapping("/{user_id}/{username}")
    public ResponseEntity deleteMember(@PathVariable("user_id") long userId,
                                    @PathVariable("username") long username){

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


    /**
     *  기능 : 비밀번호 찾기
     */
    @PostMapping("/passwordReset")
    public ResponseEntity sendPwMail(@Valid @RequestBody MemberDto.ResetPasswordDto dto){

        // 1. mail 보내기 (SMTP o)
        //
        // memberService.resetPassword(dto.getEmail());

        // 2. mail 보내지 않고 response 하기 (SMTP x)
        //
        MemberDto.ResetPasswordMail mail = memberService.resetPassword(dto.getEmail());

        return new ResponseEntity(
                new SingleResponseDto<>(mail), HttpStatus.OK
        );
    }
}
