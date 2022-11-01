package com.example.project.answer.service;

import com.example.project.answer.dto.AnswerDto;
import com.example.project.answer.entity.Answer;
import com.example.project.answer.repository.AnswerRepository;
import com.example.project.exception.BusinessLogicException;
import com.example.project.exception.ExceptionCode;
import com.example.project.member.entity.Member;
import com.example.project.member.service.MemberService;
import com.example.project.question.entity.Question;
import com.example.project.question.service.QuestionService;
import com.example.project.vote.Vote;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_ANSWER);

        Optional.ofNullable(answer.getBody())
                .ifPresent(findAnswer::setBody);

        return answerRepository.save(findAnswer);
    }
    // 3-1. Answer 추천 로직
    public Answer answerVoteUp(Answer answer) {

        // dto의 answerId를 통해 answer를 받아온다.
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        voteUpCase(findAnswer, answer.getMember().getMemberId());

        return answerRepository.save(findAnswer);

    }

    // 3-2. Answer 비추천 로직
    public Answer answerVoteDown(Answer answer) {

        // dto의 answerId를 통해 answer를 받아온다.
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        voteDownCase(findAnswer, answer.getMember().getMemberId());

        return answerRepository.save(findAnswer);
    }

    // 4. Answer 채택 로직
    public Answer acceptAnswer(Answer answer) {
        // answer에는 지금 member, question, answer 각각의 Id값만 가지고 있는 객체들이 저장되어 있음.
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        Question findQuestion = questionService.findVerifiedQuestion(answer.getQuestion().getQuestionId());

        // 1. 해당 question의 member가 지금 요청하는 member와 같은지 확인.
        if (findQuestion.getMember().getMemberId() != answer.getMember().getMemberId())
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_ANSWER);
            
        // 2. 채택된 answerId(isAccepted==1 인 경우)를 또 채택하려하면 , 채택을 취소 (0)으로 처리 후, 저장 하고 return.
        if(findAnswer.getIsAccepted()==1){
            findAnswer.setIsAccepted(0);
            return answerRepository.save(findAnswer);
        }
        // 채택된 answer가 아니라면, 채택된 답변이 있는지 확인하고, 없다면 채택 1
        else{
            acceptAnswerCheck(findQuestion);    // 해당 질문의 Answer 리스트들을 확인하여 채택된 답변 있는지 확인.
            findAnswer.setIsAccepted(1);
            return answerRepository.save(findAnswer);
        }
    }

    // 5. Answer 삭제 로직
    public void deleteAnswer(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        answerRepository.delete(findAnswer);
    }

    // 6. Answer이 실제 DB에 존재하는지 검증
    @Transactional(readOnly = true)
    public Answer findVerifiedAnswer(long answerId){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }


    // 7. request한 member가 Answer의 member인지 확인하는 로직 (자신의 Answer인지 확인)
    public void verifyAnswerMember(){

    }

    // 채택된 답변 있는지 확인하는 로직.
    private void acceptAnswerCheck(Question question){
        for (Answer answer1 : question.getAnswers()) {
            if(answer1.getIsAccepted() == 1)  throw new BusinessLogicException(ExceptionCode.ACCEPT_ANSWER_EXISTS);    // 채택된 답변이 이미 있으면, 에러 처리.
        }
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

    //answer pagination하는 로직
    public Page<Answer> findAnswers(int page, int size){
        return answerRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

}
