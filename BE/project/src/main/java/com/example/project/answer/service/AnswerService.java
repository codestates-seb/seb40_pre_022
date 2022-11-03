package com.example.project.answer.service;


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


    /**
     * 필수) answer 등록 로직
     * 1. 질문이 DB에 존재하는지 확인 후 정보를 가져온다.
     * 2. 로그인 유저이 DB에 존재하는지 확인 후 정보를 가져온다.
     * 3. 질문 - 답변 - 유저의 연관관계를 설정한다.
     * 4. VOTE - 답변의 연관관계를 설정한다.
     * 5. 저장한다.
     * @return
     */
    public Answer createAnswer(Answer answer, long questionId, String memberEmail){

        Question question = questionService.findVerifiedQuestion(questionId);
        Member member = memberService.findExistMemberByEmail(memberEmail);

        answer.setMember(member);
        answer.setQuestion(question);
        member.addAnswer(answer);
        question.addAnswer(answer);

        Vote vote = new Vote();
        vote.setAnswer(answer);
        answer.setVote(vote);

        return answerRepository.save(answer);
    }

    /**
     * 필수) answer 수정 로직
     * 1. 답변의 DB에 존재하는지 확인 후 정보를 가져온다.
     * 2. 로그인한 유저와 답변 작성자의 일치여부를 확인한다.
     * 3. 일치 시에 DTO에서 가져온 정보를 덮어쓴다.
     * 4. 저장한다.
     */
    public Answer updateAnswer(Answer answer, String memberEmail){

        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        if(!memberEmail.equals(findAnswer.getMember().getEmail())) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_ANSWER);
        }

        Optional.ofNullable(answer.getBody())
                .ifPresent(findAnswer::setBody);

        return answerRepository.save(findAnswer);
    }

    /**
     * 필수) answer의 vote 추천 로직
     * 1. 로그인 유저가 DB에 존재하는지 확인한다.
     * 2. 질문이 DB에 존재하는지 확인한다.
     * 3. 유저의 상황(과거추천여부, 처음)을 고려하여 추천수를 설정한다.
     */
    public Answer answerVoteUp(Answer answer, String memberEmail) {

        memberService.DoesMemberExist(memberEmail);

        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        voteUpCase(findAnswer, memberService.findExistMemberByEmail(memberEmail).getMemberId());

        return answerRepository.save(findAnswer);

    }

    /**
     * 필수) answer의 vote 비추천 로직
     * 1. 로그인 유저가 DB에 존재하는지 확인한다.
     * 2. 질문이 DB에 존재하는지 확인한다.
     * 3. 유저의 상황(과거추천여부, 처음)을 고려하여 추천수를 설정한다.
     */
    public Answer answerVoteDown(Answer answer, String memberEmail) {

        memberService.DoesMemberExist(memberEmail);

        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        voteDownCase(findAnswer, memberService.findExistMemberByEmail(memberEmail).getMemberId());

        return answerRepository.save(findAnswer);
    }

    // fixme - 로그인 정보의 memberEmail 추출 후 이를 적용하여 로직 수정해야함
    /**
     * 필수) answer의 채택 로직
     * 1. 질문과 답변이 DB에 존재하는지 확인 후 가져온다.
     * 2. 로그인 유저와 질문 작성자의 일치 여부를 확인한다.
     * 3. 상황에 따라 채택 여부를 결정한다
     * -> 이미 채택되어 있는 경우 : 채택 취소
     * -> 첫 채택인 경우 : 채택
     */
    public Answer acceptAnswer(Answer answer) {

        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        Question findQuestion = questionService.findVerifiedQuestion(answer.getQuestion().getQuestionId());

        if (findQuestion.getMember().getMemberId() != answer.getMember().getMemberId())
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_ANSWER);

        if(findAnswer.getIsAccepted()==1){
            findAnswer.setIsAccepted(0);
            return answerRepository.save(findAnswer);
        }
        else{
            acceptAnswerCheck(findQuestion);    // 해당 질문의 Answer 리스트들을 확인하여 채택된 답변 있는지 확인.
            findAnswer.setIsAccepted(1);
            return answerRepository.save(findAnswer);
        }
    }

    /**
     * 필수) answer의 삭제 로직
     * 1. 답변이 DB에 존재하는지 확인한다.
     * 2. 로그인 유저와 답변 작성자의 일치여부를 확인한다.
     * 3. 2번 통과시 삭제한다.
     */
    public void deleteAnswer(long answerId, String memberEmail) {

        Answer findAnswer = findVerifiedAnswer(answerId);

        if(!memberEmail.equals(findAnswer.getMember().getEmail())) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_ANSWER);
        }

        answerRepository.delete(findAnswer);
    }

    /**
     * 도구) answer가 db에 존재하는지 여부를 체크하는 메서드
     */
    @Transactional(readOnly = true)
    public Answer findVerifiedAnswer(long answerId){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }


    /**
     * 도구) 채택된 답변이 있는지를 체크하는 메서드
     */
    private void acceptAnswerCheck(Question question){
        for (Answer answer1 : question.getAnswers()) {
            if(answer1.getIsAccepted() == 1)  throw new BusinessLogicException(ExceptionCode.ACCEPT_ANSWER_EXISTS);    // 채택된 답변이 이미 있으면, 에러 처리.
        }
    }


    /**
     * 도구) vote 추천의 경우를 계산하는 메서드
     * 1. 해당 answer와 연결된 vote의 voteMap을 가져온다(유저의 과거 추천 저장)
     * 2. key와 value값으로 계산한다.
     * (question의 추천과 동일로직)
     */
    public void voteUpCase(Answer answer, long memberId){

        Map<Long, Integer> voteMap = answer.getVote().getMemberVoteMap();

        if(voteMap.containsKey(memberId)){                      // votemap에 해당 멤버가 있으면
            int value = voteMap.get(memberId);                  // 스위치문을 위해 value를 int값으로 가져온다.
            switch(value){
                case 1:    // 이미 업을 누른상황
                    answer.getVote().setVoteCount(answer.getVote().getVoteCount()-1);
                    voteMap.put(memberId, 0);
                    break;
                case 0: // 0으로 바꾼상황
                    answer.getVote().setVoteCount(answer.getVote().getVoteCount()+1);
                    voteMap.put(memberId, 1);
                    break;
                case -1: // 이미 다운을 누른 상황
                    answer.getVote().setVoteCount(answer.getVote().getVoteCount()+1);
                    voteMap.put(memberId, 0);
                    break;
            }
        }
        else{
            answer.getVote().setVoteCount(answer.getVote().getVoteCount()+1);
            voteMap.put(memberId, 1);
        }
        answer.getVote().setVoteCheck(voteMap.get(memberId));     // voteCheck 상태 저장.
    }

    /**
     * 도구) vote 비추천의 경우를 계산하는 메서드
     * 1. 해당 answer와 연결된 vote의 voteMap을 가져온다(유저의 과거 추천 저장)
     * 2. key와 value값으로 계산한다.
     * (question의 비추천과 동일로직)
     */
    public void voteDownCase(Answer answer, long memberId){

        Map<Long, Integer> voteMap = answer.getVote().getMemberVoteMap();

        if(voteMap.containsKey(memberId)){                      // votemap에 해당 멤버가 있으면
            int value = voteMap.get(memberId);                  // 스위치문을 위해 value를 int값으로 가져온다.
            switch(value){
                case 1:    // 업이면
                    answer.getVote().setVoteCount(answer.getVote().getVoteCount()-1);
                    voteMap.put(memberId, 0);
                    break;
                case 0:
                    answer.getVote().setVoteCount(answer.getVote().getVoteCount()-1);
                    voteMap.put(memberId, -1);
                    break;
                case -1:
                    answer.getVote().setVoteCount(answer.getVote().getVoteCount()+1);
                    voteMap.put(memberId, 0);
                    break;
            }
        }
        else{
            answer.getVote().setVoteCount(answer.getVote().getVoteCount()-1); // -1 해주면서
            voteMap.put(memberId, -1); // -1 멤버로 새로 추가
        }

        answer.getVote().setVoteCheck(voteMap.get(memberId));     // voteCheck 상태 저장.
    }

    /**
     * 도구) answer의 pagination로직
     */
    public Page<Answer> findAnswers(int page, int size){
        return answerRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

}
