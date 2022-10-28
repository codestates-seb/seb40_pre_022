package com.example.project.question.mapper;

import com.example.project.member.entity.Member;
import com.example.project.question.dto.*;
import com.example.project.question.entity.Question;
import com.example.project.question.entity.QuestionTag;
import com.example.project.tag.Tag;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    // 문제) tag관련 문제를 풀어야함. 모든 계층 통과후 response를 주었을때 tag가 포함 안되어 있는 문제 발생. 어디서 문제인지 모르겠음
    // patch도 마찬가지.
    default Question questionPostDtoToQuestion(QuestionDto.QuestionPostDto questionPostDto){
        Question question = new Question();

        question.setTitle(questionPostDto.getTitle());
        question.setBody(questionPostDto.getBody());

        List<QuestionTag> questionTags = questionPostDto.getQuestionTags().stream()
                .map(questionTagDto -> {
                    QuestionTag questionTag = new QuestionTag();
                    questionTag.setQuestionTagName(questionTagDto.getQuestionTagName());
                    questionTag.setQuestion(question);
                    return questionTag;
                }).collect(Collectors.toList());

        question.setQuestionTags(questionTags);

        return question;
    }
//    Question questionPostDtoToQuestion(QuestionDto.QuestionPostDto questionPostDto);
    default Question questionPatchDtoToQuestion(QuestionDto.QuestionPatchDto questionPatchDto){
        Question question = new Question();

        question.setQuestionId(questionPatchDto.getQuestionId());
        question.setTitle(questionPatchDto.getTitle());
        question.setBody(questionPatchDto.getBody());

        List<QuestionTag> questionTags = questionPatchDto.getQuestionTags().stream()
                .map(questionTagDto -> {
                    QuestionTag questionTag = new QuestionTag();
                    questionTag.setQuestionTagName(questionTagDto.getQuestionTagName());
                    questionTag.setQuestion(question);
                    return questionTag;
                }).collect(Collectors.toList());

        question.setQuestionTags(questionTags);

        return question;
    };

    default QuestionDto.QuestionResponseDto questionToQuestionResponseDto(Question question) {
        QuestionDto.QuestionResponseDto questionResponseDto = new QuestionDto.QuestionResponseDto();
        QuestionDto.QuestionMemberDto questionMemberDto = new QuestionDto.QuestionMemberDto();

        Member member = question.getMember();
        questionMemberDto.setName(member.getName());
        questionMemberDto.setEmail(member.getEmail());
        questionMemberDto.setImgae(member.getImage());

        List<QuestionDto.QuestionTagDto> questionTagDtoList = question.getQuestionTags().stream()
                        .map(questionTag -> {
                            QuestionDto.QuestionTagDto questionTagDto = new QuestionDto.QuestionTagDto();
                            questionTagDto.setQuestionTagName(questionTag.getQuestionTagName());
                            return questionTagDto;
                        }).collect(Collectors.toList());

        questionResponseDto.setQuestionId(question.getQuestionId());
        questionResponseDto.setTitle(question.getTitle());
        questionResponseDto.setBody(question.getBody());
        questionResponseDto.setVoteCount(question.getVote().getVoteCount());
        questionResponseDto.setViewCount(question.getViewCount());
        questionResponseDto.setQuestionMemberDto(questionMemberDto);
        questionResponseDto.setAnswers(question.getAnswers());
        questionResponseDto.setQuestionTags(questionTagDtoList);
        questionResponseDto.setCreatedAt(question.getCreatedAt());
        questionResponseDto.setUpdatedAt(question.getModifiedAt());

        return questionResponseDto;
    }
    default QuestionDto.QuestionForUpdateResponseDto questionToQuestionForUpdateResponseDto(Question question){
        QuestionDto.QuestionForUpdateResponseDto questionForUpdateResponseDto =
                new QuestionDto.QuestionForUpdateResponseDto();

        questionForUpdateResponseDto.setQuestionId(question.getQuestionId());
        questionForUpdateResponseDto.setTitle(question.getTitle());
        questionForUpdateResponseDto.setBody(question.getBody());

        List<QuestionDto.QuestionTagDto> questionTagDtoList = question.getQuestionTags().stream()
                .map(questionTag -> {
                    QuestionDto.QuestionTagDto questionTagDto = new QuestionDto.QuestionTagDto();
                    questionTagDto.setQuestionTagName(questionTag.getQuestionTagName());
                    return questionTagDto;
                }).collect(Collectors.toList());
        return questionForUpdateResponseDto;
    }
    QuestionDto.QuestionListResponseDto questionToQuestionListResponseDto(Question question);//default사용
}
