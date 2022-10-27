package com.example.project.member.mapper;

import com.example.project.member.dto.MemberDto;
import com.example.project.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.MemberPostDto memberPostDto);
    Member memberPatchDtoToMember(MemberDto.MemberPatchDto memberPatchDto);
    MemberDto.MemberResponseDto memberToMemberResponseDto(Member member);
}
