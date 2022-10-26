package com.example.project.question.mapper;

import com.example.project.question.dto.*;
import com.example.project.question.entity.Question;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    Question QuestionPostDtoToQuestion(QuestionDto.QuestionPostDto questionPostDto);
    Question QuestionPatchDtoToQuestion(QuestionDto.QuestionPatchDto questionPatchDto);
    Question RecommendPatchDtoToQuestion(QuestionDto.RecommendPatchDto recommendPatchDto);
    QuestionDto.QuestionResponseDto QuestionToQuestionResponseDto(Question question);
    QuestionDto.RecommendResponseDto QuestionToRecommendResponseDto(Question question);
}
