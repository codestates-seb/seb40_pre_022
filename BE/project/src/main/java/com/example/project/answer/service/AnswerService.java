package com.example.project.answer.service;

import com.example.project.answer.dto.AnswerDto;
import com.example.project.answer.entity.Answer;
import com.example.project.answer.repository.AnswerRepository;
import com.example.project.member.entity.Member;
import com.example.project.member.service.MemberService;
import com.example.project.question.entity.Question;
import com.example.project.question.service.QuestionService;
import com.example.project.vote.Vote;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionService questionService;
    private final MemberService memberService;

    // 1. Answer 등록 로직
    public Answer createAnswer(Answer answer){
        Question question = questionService.findVerifiedQuestion(answer.getQuestion().getQuestionId());
        Member member = memberService.findExistMember(answer.getMember().getMemberId());


        answer.setMember(member);
        answer.setQuestion(question);       // 이건 여기서 해야하나 말아야하나?? mapper에서 그냥 id만 받아서 쓰나?

        Vote vote = new Vote();
        vote.setAnswer(answer);
        answer.setVote(vote);

        return answerRepository.save(answer);
    }

    // 2. Answer 수정 로직
    public Answer updateAnswer(Answer answer, long memberId){
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        // memberId와 AnswerId가 다르면 오류 발생.
        if(memberId!=findAnswer.getMember().getMemberId())
            throw new RuntimeException();       // fixme ErrorCODE 수정할 것.

        Optional.ofNullable(answer.getBody())
                .ifPresent(findAnswer::setBody);

        return answerRepository.save(findAnswer);
    }
    // 3-1. Answer 추천 로직
    public Answer answerVoteUp(AnswerDto.AnswerVotePatch dto) {

        // dto의 answerId를 통해 answer를 받아온다.
        Answer answer = findVerifiedAnswer(dto.getAnswerId());
        voteUpCase(answer, dto.getMemberId());

        return answerRepository.save(answer);

    }

    // 3-2. Answer 비추천 로직
    public Answer answerVoteDown(AnswerDto.AnswerVotePatch dto) {

        // dto의 answerId를 통해 answer를 받아온다.
        Answer answer = findVerifiedAnswer(dto.getAnswerId());
        voteDownCase(answer, dto.getMemberId());

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


    // voteUp계산
    public void voteUpCase(Answer answer, long memberId){ // checked v

        Map<Long, Integer> voteMap = answer.getVote().getMemberVoteMap();  // 해당 question의 votemap을 가져온다.

        if(voteMap.containsKey(memberId)){    // votemap에 해당 멤버가 있으면
            int value = voteMap.get(memberId);  // 스위치문을 위해 value를 int값으로 가져온다.
            switch(value){
                case 1:    // 이미 업을 누른상황
                    answer.getVote().setVoteCount(answer.getVote().getVoteCount()-1); // 카운트 다운
                    voteMap.put(memberId, 0); // 1 -> 0값으로 넣어줌
                    break;
                case 0: // 0으로 바꾼상황
                    answer.getVote().setVoteCount(answer.getVote().getVoteCount()+1); // 카운트 업
                    voteMap.put(memberId, 1); // 0 -> 1 넣어줌
                    break;
                case -1: // 이미 다운을 누른 상황
                    answer.getVote().setVoteCount(answer.getVote().getVoteCount()+1); // 카운트 업
                    voteMap.put(memberId, 0); // -1 -> 0
                    break;
            }
        }
        else{
            answer.getVote().setVoteCount(answer.getVote().getVoteCount()+1);
            voteMap.put(memberId, 1);
        }
        answer.getVote().setVoteCheck(voteMap.get(memberId));     // voteCheck 상태 저장.
    }

    public void voteDownCase(Answer answer, long memberId){ // checked v

        Map<Long, Integer> voteMap = answer.getVote().getMemberVoteMap();  // 해당 question의 votemap을 가져온다.

        if(voteMap.containsKey(memberId)){    // votemap에 해당 멤버가 있으면
            int value = voteMap.get(memberId);  // 스위치문을 위해 value를 int값으로 가져온다.
            switch(value){
                case 1:    // 업이면
                    answer.getVote().setVoteCount(answer.getVote().getVoteCount()-1); // 카운트 다운
                    voteMap.put(memberId, 0); // 1 -> 0
                    break;
                case 0:
                    answer.getVote().setVoteCount(answer.getVote().getVoteCount()-1); // 카운트 다운
                    voteMap.put(memberId, -1); // 0 -> -1
                    break;
                case -1:
                    answer.getVote().setVoteCount(answer.getVote().getVoteCount()+1); // 카운트 업
                    voteMap.put(memberId, 0); // -1 -> 0
                    break;
            }
        }
        else{
            answer.getVote().setVoteCount(answer.getVote().getVoteCount()-1); // -1 해주면서
            voteMap.put(memberId, -1); // -1 멤버로 새로 추가
        }

        answer.getVote().setVoteCheck(voteMap.get(memberId));     // voteCheck 상태 저장.
    }

}
