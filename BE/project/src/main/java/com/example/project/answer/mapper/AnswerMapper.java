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
        response.setModifiedAt(answer.getModifiedAt());

        return response;
    }

    //여기서 필요 정보를 가공해서 answer로 넘기면 dto를 서비스단까지 옮길 필요가 없습니다.
    default Answer answerVoteDtoToAnswer(AnswerDto.AnswerVotePatch answerVotePatch){
        Answer answer = new Answer();
        Member member = new Member();

        member.setMemberId(answerVotePatch.getMemberId());
        answer.setAnswerId(answerVotePatch.getAnswerId());

        answer.setMember(member);

        return answer;
    }
}
