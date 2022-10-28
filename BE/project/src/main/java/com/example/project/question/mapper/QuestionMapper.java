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

        questionForUpdateResponseDto.setQuestionTags(questionTagDtoList);
        return questionForUpdateResponseDto;
    }
    default QuestionDto.QuestionListResponseDto questionToQuestionListResponseDto(Question question) {
        QuestionDto.QuestionListResponseDto questionListResponseDto =
                new QuestionDto.QuestionListResponseDto();
        QuestionDto.QuestionMemberDto questionMemberDto = new QuestionDto.QuestionMemberDto();

        Member member = question.getMember();
        questionMemberDto.setName(member.getName());
        questionMemberDto.setEmail(member.getEmail());
        questionMemberDto.setImgae(member.getImage());

        questionListResponseDto.setQuestionId(question.getQuestionId());
        questionListResponseDto.setTitle(question.getTitle());
        questionListResponseDto.setBody(question.getBody());
        questionListResponseDto.setViewCount(question.getViewCount());
        questionListResponseDto.setVoteCount(question.getVote().getVoteCount());
        questionListResponseDto.setQuestionMemberDto(questionMemberDto);

        List<QuestionDto.QuestionTagDto> questionTagDtoList = question.getQuestionTags().stream()
                .map(questionTag -> {
                    QuestionDto.QuestionTagDto questionTagDto = new QuestionDto.QuestionTagDto();
                    questionTagDto.setQuestionTagName(questionTag.getQuestionTagName());
                    return questionTagDto;
                }).collect(Collectors.toList());

        questionListResponseDto.setQuestionTags(questionTagDtoList);
        questionListResponseDto.setAnswerCount(question.getAnswers().size());
        questionListResponseDto.setCreatedAt(question.getCreatedAt());
        questionListResponseDto.setUpdatedAt(question.getModifiedAt());

        return questionListResponseDto;
    }
}
