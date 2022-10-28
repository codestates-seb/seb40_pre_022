package com.example.project.answer.service;

import com.example.project.answer.dto.AnswerDto;
import com.example.project.answer.entity.Answer;
import com.example.project.answer.repository.AnswerRepository;
import com.example.project.vote.entity.Vote;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;
    // 1. Answer 등록 로직
    public Answer createAnswer(Answer answer){
        Answer savedAnswer = answerRepository.save(answer);

        return savedAnswer;
    }

    // 2. Answer 수정 로직
    public Answer updateAnswer(Answer answer, long memberId){

        // memberId와 AnswerId가 다르면 오류 발생.
        if(memberId!=answer.getMember().getMemberId())
            throw new RuntimeException();       // fixme ErrorCODE 수정할 것.


        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getBody())
                .ifPresent(findAnswer::setBody);

        return answerRepository.save(findAnswer);
    }
    // 3. Answer 추천/비추천 로직
    public Answer voteUp(AnswerDto.AnswerVotePatch dto) {

        // dto의 answerId를 통해 answer를 받아온다.
        Answer answer = findVerifiedAnswer(dto.getAnswerId());

        // answer를 통해 vote를 가져오고, service에서만 사용할 변수 voteCheck, memberId를 각각 정의함.
        Vote vote = answer.getVote();
        int voteCheck = dto.getVoteCheck();
        long memberId = dto.getMemberId();

        // 전달받은 memberId로 vote를 한 적이 없다면.
        if(!vote.getMemberVoteMap().containsKey(memberId)){
            vote.getMemberVoteMap().put(memberId, voteCheck);
        }

        else{

            if (vote.getMemberVoteMap().get(memberId) == -1){               // 이미 -1 (싫어요) 상태에서,
                if(voteCheck == -1) vote.getMemberVoteMap().put(memberId,0);    // -1(싫어요)면, 0 (취소)
                else vote.getMemberVoteMap().put(memberId, 1);                  // 1(좋아요)면, 1로 변경.
            }
            else if(vote.getMemberVoteMap().get(memberId)==1){              // 1 (좋아요) 상태에서,
                if(voteCheck == 1) vote.getMemberVoteMap().put(memberId,0);     // 1(좋아요)면, 0(취소)
                else vote.getMemberVoteMap().put(memberId, -1);                 // -1(싫어요)면, -1로 변경.
            }
            else{ // 0 (취소상태, 아무것도 안누른 상태)
                if(voteCheck == -1) vote.getMemberVoteMap().put(memberId,-1);    // -1(싫어요)면, -1
                else vote.getMemberVoteMap().put(memberId, 1);                  // 1(좋아요)면, 1로 변경.
            }
        }

        // controller의 return 값으로 voteCount랑 voteCheck만 주면 됨.

        // value값들을 stream으로 sum하여, voteCount 넣어주기
        vote.setVoteCount(
                vote.getMemberVoteMap().values().stream()
                        .mapToInt(a->a)
                        .sum()
        );
        // 현재 member가 좋아요/싫어요 무엇을 했는지 전달해주기 위함.
        vote.setVoteCheck(vote.getMemberVoteMap().get(memberId));

        answer.setVote(vote);
        return answerRepository.save(answer);
    }

    // 4. Answer 채택 로직
    public void acceptAnswer(long memberId, long questionId, long answerId) {

    }
    // 5. Answer 삭제 로직
    public void deleteAnswer(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        answerRepository.delete(findAnswer);
    }

    // 6. Answer이 실제 DB에 존재하는지 검증
    public Answer findVerifiedAnswer(long answerId){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(()->
                new RuntimeException());     // todo Error: ANSWER_NOT_FOUND 답변이 없는경우에는 수정이 불가능하다.
        return findAnswer;
    }


    // 7. request한 member가 Answer의 member인지 확인하는 로직 (자신의 Answer인지 확인)
    public void verifyAnswerMember(){

    }

    // get 테스트용. 구현대상 X
    public Answer findAnswer(long answerId) {
        return findVerifiedAnswer(answerId);
    }


    // Todo. 답변 생성
    // 이미 등록된 답변이 있는가? => 있어도 올릴 수 있어 . (X)
    //

    // Todo. 답변 수정
    // 1. 지금 이 Answer의 작성자와 RequestBody의 member가 같은가? => 다르면, error (작성자가 아닙니다.)
    //      1-1. 프론트 쪽에서 MemberID와 미리 비교해서 없으면 수정버튼을 만들지 않을것같기는 한데 일단 적어둡니다.
    // 2. 답변 수정 완료.

    // Todo. 답변 추천/비추천
    // 1. 해당 답변의 Vote가 가지고 있는 Map에 내가(RequestBody의 Member) 등록이 되어있는가? => 되어 있다면, up인가? down인가?
    // 2. Vote의 Map에 Member 등록하고, up down value값으로 넣기.
    // 3. 추천/비추천 완료.

    // Todo. 답변 채택
    // 1. 해당 질문의 작성자와 requestBody로 들어온 memberId가 같은가? => 아니면 error.
    // 2. 해당 질문이 가지고 있는 답변들에 이미 채택된 답변이 있는가? => 있으면, error.
    // 3. 채택 완료.

}
