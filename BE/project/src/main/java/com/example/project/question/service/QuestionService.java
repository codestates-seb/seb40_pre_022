package com.example.project.question.service;

import com.example.project.exception.BusinessLogicException;
import com.example.project.exception.ExceptionCode;
import com.example.project.member.entity.Member;
import com.example.project.member.service.MemberService;
import com.example.project.question.dto.QuestionDto;
import com.example.project.question.entity.Question;
import com.example.project.question.entity.QuestionTag;
import com.example.project.question.repository.QuestionRepository;
import com.example.project.vote.Vote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MemberService memberService;

    public QuestionService(QuestionRepository questionRepository, MemberService memberService) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
    }

    //1 메인페이지 위함 - checked. v
    public Page<Question> findQuestionsByViewCount(int page, int size){

        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("viewCount").descending()));
    }

    //2 question 목록 조회 - checked. v
    public Page<Question> findQuestions(int page, int size){

        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    //todo 3. 키워드별 question 조회 + 추후 추가
    public Page<Question> findQuestionByKeyword(String keyword, int page, int size){
        // 1. keyword로 레포지터리에서 검색한다.

        // 2. 중복을 제거한다 set

        // 3. 합친다.
        return null;
    }

    //4 상세페이지 가져오기 - checked v
    public Question findQuestion(long questionId){

        Question question = findVerifiedQuestion(questionId);
        question.setViewCount(question.getViewCount()+1); // 조회수 증가

        return questionRepository.save(question);
    }

    //5 수정 위해 question 불러올때
    public Question findQuestionForUpdate(long questionId, String memberEmail){

        //1. 현재 로그인 한 멤버 확인 - 토큰에서 담아왔고, 거기서 추출한 메일로 이 글의 멤버와 비교한다.
        if(!memberEmail.equals(findVerifiedQuestion(questionId).getMember().getEmail())) {
            throw new RuntimeException();
        }

        //2. 수정 대상 question을 가져온다.
        Question question = findQuestion(questionId);

        return question;
    }

    //6 수정
    public Question updateQuestion(Question question, String memberEmail){

        //1. 로그인 한 멤버가 이 글의 주인인지 확인
        if(!memberEmail.equals(findVerifiedQuestion(question.getQuestionId()).getMember().getEmail())) {
            throw new RuntimeException();
        }

        //2 수정하기
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getBody())
                .ifPresent(body -> findQuestion.setBody(body));

        return questionRepository.save(findQuestion);
    }

    //7,8 질문 추천 올리기 내리기 + 추후 작성
    public Question questionVoteUp(Question question, String memberEmail){

        //1. 로그인한 사람이 존재하는지 확인 - 당연히 존재하겠지만 로직적으로 접근
        memberService.DoesMemberExist(memberEmail);

        //2. 질문존재 확인 후 가져오기
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        //3. 로그인한 사람의 정보와 대조해서 count 계산
        voteUpCase(findQuestion, memberService.findExistMemberByEmail(memberEmail).getMemberId());

        //5. votemap 최신화를 위한 저장 - 이래야 값들이 저장됨
        return questionRepository.save(findQuestion);
    }

    public Question questionVoteDown(Question question, String memberEmail){

        //1. 로그인한 사람이 존재하는지 확인 - 당연히 존재하겠지만 로직적으로 접근
        memberService.DoesMemberExist(memberEmail);


        //2. 질문존재 확인 후 가져오기
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        //3. 로그인한 사람의 정보와 대조해서 count 계산
        voteDownCase(findQuestion, memberService.findExistMemberByEmail(memberEmail).getMemberId());

        //5. votemap 최신화를 위한 저장 - 이래야 값들이 저장된다.
        return questionRepository.save(findQuestion); // 저장한다.
    }

    //9 question 생성
    public Question createQuestion(Question question, String memberEmail){

        // 현재 로그인 한 사람 확인 후 질문과 연결
        Member member = memberService.findExistMemberByEmail(memberEmail);
        question.setMember(member);
        member.addQuestion(question);

        // vote 객체 생성 후 연결 - 해당 question을 위한 vote객체 ->  // cascade이용 db자동등록
        Vote vote = new Vote();
        vote.setQuestion(question);
        question.setVote(vote);

        //todo. 5. questionTag 객체 생성 후 연결 --> mapper에서 default로 이미 question에 넣어주었는데..

        return questionRepository.save(question);
    }

    //10 question 제거 - checked v / ** 추후 question status 사용 유무 이야기
    public void deleteQuestion(long questionId, String memberEmail){

        //로그인 한 사람이 이 글의 주인인지.
        if(!memberEmail.equals(findVerifiedQuestion(questionId).getMember().getEmail())) {
            throw new RuntimeException();
        }
        Question question = findQuestion(questionId);
        questionRepository.delete(question);
    }

    // question이 DB에 존재하지 않으면 에러 - checked v
    public Question findVerifiedQuestion(long questionId){
        Optional<Question> question = questionRepository.findById(questionId);
        Question findQuestion = question.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }

    // question이 DB에 존재하면 에러 - cheked v
    public void verifyExistQuestion(long questionId){
        Optional<Question> question = questionRepository.findById(questionId);
        if(question.isPresent())
            throw new BusinessLogicException(ExceptionCode.QUESTION_EXISTS);
    }

    // 추천 로직
    public void voteUpCase(Question question, long memberId){ // checked v


        Map<Long, Integer> voteMap = question.getVote().getMemberVoteMap();  // 해당 question의 votemap을 가져온다.

        if(voteMap.containsKey(memberId)){    // votemap에 해당 멤버가 있으면
            int value = voteMap.get(memberId);  // 스위치문을 위해 value를 int값으로 가져온다.
            switch(value){
                case 1:    // 이미 업을 누른상황
                    question.getVote().setVoteCount(question.getVote().getVoteCount()-1); // 카운트 다운
                    voteMap.put(memberId, 0); // 1 -> 0값으로 넣어줌
                    break;
                case 0: // 0으로 바꾼상황
                    question.getVote().setVoteCount(question.getVote().getVoteCount()+1); // 카운트 업
                    voteMap.put(memberId, 1); // 0 -> 1 넣어줌
                    break;
                case -1: // 이미 다운을 누른 상황
                    question.getVote().setVoteCount(question.getVote().getVoteCount()+1); // 카운트 업
                    voteMap.put(memberId, 0); // -1 -> 0
                    break;
            }
        }
        else{
            question.getVote().setVoteCount(question.getVote().getVoteCount()+1);
            voteMap.put(memberId, 1);
        }
        question.getVote().setVoteCheck(voteMap.get(memberId));     // voteCheck 상태 저장.
    }

    // 비추천 로직
    public void voteDownCase(Question question, long memberId){ // checked v

        Map<Long, Integer> voteMap = question.getVote().getMemberVoteMap();  // 해당 question의 votemap을 가져온다.

        if(voteMap.containsKey(memberId)){    // votemap에 해당 멤버가 있으면
            int value = voteMap.get(memberId);  // 스위치문을 위해 value를 int값으로 가져온다.
            switch(value){
                case 1:    // 업이면
                    question.getVote().setVoteCount(question.getVote().getVoteCount()-1); // 카운트 다운
                    voteMap.put(memberId, 0); // 1 -> 0
                    break;
                case 0:
                    question.getVote().setVoteCount(question.getVote().getVoteCount()-1); // 카운트 다운
                    voteMap.put(memberId, -1); // 0 -> -1
                    break;
                case -1:
                    question.getVote().setVoteCount(question.getVote().getVoteCount()+1); // 카운트 업
                    voteMap.put(memberId, 0); // -1 -> 0
                    break;
            }
        }
        else{
            question.getVote().setVoteCount(question.getVote().getVoteCount()-1); // -1 해주면서
            voteMap.put(memberId, -1); // -1 멤버로 새로 추가
        }
        question.getVote().setVoteCheck(voteMap.get(memberId));     // voteCheck 상태 저장.
    }
}
