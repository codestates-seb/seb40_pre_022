package com.example.project.answer.mapper;


import com.example.project.answer.dto.AnswerDto;
import com.example.project.answer.entity.Answer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")      // unmappedTargetPolicy 는 추후 추가.
public interface AnswerMapper {
    Answer answerPostToAnswer(AnswerDto.Post answerPostDto);
    Answer answerPatchToAnswer(AnswerDto.Patch answerPatchDto);


    voteToResponse(    ){

    }

    AnswerDto.Response answerToAnswerResponse(Answer answer);


}
