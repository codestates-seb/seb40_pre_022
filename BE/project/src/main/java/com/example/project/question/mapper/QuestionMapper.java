package com.example.project.question.mapper;

import com.example.project.member.entity.Member;
import com.example.project.question.dto.*;
import com.example.project.question.entity.Question;
import com.example.project.question.entity.QuestionTag;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    default Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto){
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

    default Question questionPatchDtoToQuestion(QuestionDto.Patch questionPatchDto){
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

    default QuestionDto.Response questionToQuestionResponseDto(Question question) {
        QuestionDto.Response questionResponseDto = new QuestionDto.Response();
        QuestionDto.QuestionMemberDto questionMemberDto = new QuestionDto.QuestionMemberDto();

        Member member = question.getMember();
        questionMemberDto.setMemberId(member.getMemberId());
        questionMemberDto.setName(member.getName());
        questionMemberDto.setEmail(member.getEmail());
        questionMemberDto.setImage("/initialProfile.png");

        List<QuestionDto.QuestionAnswerDto> questionAnswerDtos = question.getAnswers().stream()
                .map(answer -> {
                    QuestionDto.QuestionAnswerDto questionAnswerDto = new QuestionDto.QuestionAnswerDto();
                    questionAnswerDto.setAnswerId(answer.getAnswerId());
                    questionAnswerDto.setBody(answer.getBody());
                    questionAnswerDto.setVoteCount(answer.getVote().getVoteCount());
                    Member answerMember = answer.getMember();
                    QuestionDto.QuestionMemberDto answerQuestionMemberDto = new QuestionDto.QuestionMemberDto();
                    answerQuestionMemberDto.setMemberId(answerMember.getMemberId()); // ?????????
                    answerQuestionMemberDto.setName(answerMember.getName());
                    answerQuestionMemberDto.setEmail(answerMember.getEmail());
                    answerQuestionMemberDto.setImage(answerQuestionMemberDto.getImage());
                    questionAnswerDto.setMember(answerQuestionMemberDto);
                    questionAnswerDto.setIsAccepted(answer.getIsAccepted());
                    questionAnswerDto.setCreatedAt(answer.getCreatedAt());
                    questionAnswerDto.setUpdatedAt(answer.getModifiedAt());
                    return questionAnswerDto;
                })
                .collect(Collectors.toList());

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
        questionResponseDto.setMember(questionMemberDto);
        questionResponseDto.setAnswers(questionAnswerDtos);
        questionResponseDto.setQuestionTags(questionTagDtoList);
        questionResponseDto.setCreatedAt(question.getCreatedAt());
        questionResponseDto.setUpdatedAt(question.getModifiedAt());

        return questionResponseDto;
    }
    default QuestionDto.QuestionForUpdateResponse questionToQuestionForUpdateResponseDto(Question question){
        QuestionDto.QuestionForUpdateResponse questionForUpdateResponseDto =
                new QuestionDto.QuestionForUpdateResponse();

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
    default QuestionDto.QuestionListResponse questionToQuestionListResponseDto(Question question) {
        QuestionDto.QuestionListResponse questionListResponseDto =
                new QuestionDto.QuestionListResponse();
        QuestionDto.QuestionMemberDto questionMemberDto = new QuestionDto.QuestionMemberDto();

        Member member = question.getMember();
        questionMemberDto.setMemberId(member.getMemberId());
        questionMemberDto.setName(member.getName());
        questionMemberDto.setEmail(member.getEmail());
        questionMemberDto.setImage("/initialProfile.png");

        questionListResponseDto.setQuestionId(question.getQuestionId());
        questionListResponseDto.setTitle(question.getTitle());
        questionListResponseDto.setBody(question.getBody());
        questionListResponseDto.setViewCount(question.getViewCount());
        questionListResponseDto.setVoteCount(question.getVote().getVoteCount());
        questionListResponseDto.setMember(questionMemberDto);

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

    // question vote????????? ?????? - questionId??? memberId??? ????????? question??? ????????????.
    default Question questionVotePatchToQuestion (QuestionDto.QuestionVotePatch questionVotePatch){
        Question question = new Question();
        Member member = new Member();

        member.setMemberId(questionVotePatch.getMemberId());
        question.setQuestionId(questionVotePatch.getQuestionId());

        question.setMember(member);

        return question;
    }


    // vote Response??? Dto mapper
    default QuestionDto.QuestionVoteResponse questionToVoteResponse(Question question){
        QuestionDto.QuestionVoteResponse response = new QuestionDto.QuestionVoteResponse();
        response.setVoteCheck(question.getVote().getVoteCheck());
        response.setVoteCount(question.getVote().getVoteCount());

        return response;
    }
}
