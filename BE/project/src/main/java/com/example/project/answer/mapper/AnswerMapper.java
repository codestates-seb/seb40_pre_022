package com.example.project.answer.mapper;


import com.example.project.answer.dto.AnswerDto;
import com.example.project.answer.entity.Answer;
import com.example.project.member.entity.Member;
import com.example.project.question.entity.Question;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")      // unmappedTargetPolicy 는 추후 추가.
public interface AnswerMapper {
    default Answer answerPostToAnswer(AnswerDto.Post answerPostDto){
        Answer answer = new Answer();
        Member member = new Member();
        Question question = new Question();
        member.setMemberId(answerPostDto.getMemberId());
        question.setQuestionId(answerPostDto.getQuestionId());

        answer.setMember(member);
        answer.setQuestion(question);
        answer.setBody(answerPostDto.getBody());

        return answer;
    }


    Answer answerPatchToAnswer(AnswerDto.Patch answerPatchDto);

    default AnswerDto.VoteResponse answerToVoteResponse(Answer answer){
        AnswerDto.VoteResponse response = new AnswerDto.VoteResponse();
        response.setVoteCheck(answer.getVote().getVoteCheck());
        response.setVoteCount(answer.getVote().getVoteCount());
        return response;
    }


    default AnswerDto.Response answerToAnswerResponse(Answer answer){
        AnswerDto.Response response = new AnswerDto.Response();
        response.setAnswerId(answer.getAnswerId());

        AnswerDto.AnswerMemberResponse answerMemberResponse = new AnswerDto.AnswerMemberResponse();
        answerMemberResponse.setName(answer.getMember().getName());
        answerMemberResponse.setEmail(answer.getMember().getEmail());
        answerMemberResponse.setImage(answer.getMember().getImage());

        response.setMember(answerMemberResponse);
        response.setBody(answer.getBody());
        response.setVoteCount(answer.getVote().getVoteCount());
        response.setCreatedAt(answer.getCreatedAt());
        response.setUpdatedAt(answer.getModifiedAt());

        return response;
    }


}
