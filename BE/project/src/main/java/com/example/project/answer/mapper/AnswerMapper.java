package com.example.project.answer.mapper;


import com.example.project.answer.dto.AnswerDto;
import com.example.project.answer.entity.Answer;
import com.example.project.member.entity.Member;
import com.example.project.question.entity.Question;
import com.example.project.vote.entity.Vote;
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
    };


    Answer answerPatchToAnswer(AnswerDto.Patch answerPatchDto);

    Vote answerVotePatchToVote(AnswerDto.AnswerVotePatch answerVotePatch);

    AnswerDto.VoteResponse voteToVoteResponse(Vote vote);


    AnswerDto.Response answerToAnswerResponse(Answer answer);


}
