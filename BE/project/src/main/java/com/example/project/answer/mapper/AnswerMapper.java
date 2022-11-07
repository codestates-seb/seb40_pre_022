package com.example.project.answer.mapper;


import com.example.project.answer.dto.AnswerDto;
import com.example.project.answer.entity.Answer;
import com.example.project.member.entity.Member;
import com.example.project.question.entity.Question;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")      // unmappedTargetPolicy 는 추후 추가.
public interface AnswerMapper {
    Answer answerPostToAnswer(AnswerDto.Post answerPostDto);

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
        response.setIsAccepted(answer.getIsAccepted());
        response.setCreatedAt(answer.getCreatedAt());
        response.setUpdatedAt(answer.getModifiedAt());

        return response;
    }

    // 답변 채택 Dto
//    default Answer answerAcceptToAnswer(AnswerDto.AcceptPatch acceptPatch) {
//        Answer answer = new Answer();
//        Member member = new Member();
//        Question question = new Question();
//
//        // member, question 에 먼저 Id값을 입력하고,
//        question.setQuestionId(acceptPatch.getQuestionId());
//        member.setMemberId(acceptPatch.getMemberId());
//
//        // answer에 그 값들을 각각 저장해준다.
//        answer.setAnswerId(acceptPatch.getAnswerId());
//        answer.setQuestion(question);
//        answer.setMember(member);
//
//        return answer;
//    }

    Answer answerAcceptToAnswer(AnswerDto.AcceptPatch acceptPatch);


    //여기서 필요 정보를 가공해서 answer로 넘기면 dto를 서비스단까지 옮길 필요가 없습니다.
    Answer answerVoteDtoToAnswer(AnswerDto.AnswerVotePatch answerVotePatch);

    // AcceptResponse로 변환. (default 정의 필요 없을듯)
    AnswerDto.AcceptResponse answerToAcceptResponse(Answer answer);

}
