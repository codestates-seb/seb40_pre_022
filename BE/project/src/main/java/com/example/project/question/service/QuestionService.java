package com.example.project.question.service;

import com.example.project.answer.entity.Answer;
import com.example.project.exception.BusinessLogicException;
import com.example.project.exception.ExceptionCode;
import com.example.project.member.entity.Member;
import com.example.project.member.service.MemberService;
import com.example.project.question.entity.Question;
import com.example.project.question.entity.QuestionTag;
import com.example.project.question.repository.QuestionRepository;
import com.example.project.vote.Vote;
import org.hibernate.query.criteria.internal.BasicPathUsageException;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
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

    //3 키워드별 question 조회 + 추후 추가
    public Page<Question> findQuestionByKeyword(String keyword, int page, int size){
        // 1. keyword로 레포지터리에서 검색한다.
        // 2. 정보를 싸그리 가져다가 viewCount순으로 정렬한다??
        return null;
    }

    //4 상세페이지 가져오기 - checked v
    public Question findQuestion(long questionId){

        Question question = findVerifiedQuestion(questionId);
        question.setViewCount(question.getViewCount()+1); // 조회수 증가

        return questionRepository.save(question);
    }

    //5 수정 위해 question 불러올때
    public Question findQuestionForUpdate(long questionId){

        //1. 현재 로그인 한 멤버 확인

        //2. 이 글의 주인인지 확인

        //3. 수정 대상 question을 가져온다.
        Question question = findQuestion(questionId);

        return question;
    }

    //6 수정
    public Question updateQuestion(Question question){

        // 사실 로직적으로 5번이 먼저 일어나기때문에 여기서 또 체크하는 것이 비용낭비인가 싶기도 하다.
        //1. 현재 로그인 한 멤버 확인

        //2. 이 글의 주인인지 확인

        //3 수정하기
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getBody())
                .ifPresent(body -> findQuestion.setBody(body));

        return questionRepository.save(findQuestion);
    }

    //7,8 질문 추천 올리기 내리기 + 추후 작성
    public int questionVoteUp(long questionId){

        //1. 현재 로그인 한 사람의 정보
        Member member = new Member(1);

        //2. 질문 가져오기
        Question question = findVerifiedQuestion(questionId);

        //3. 로그인한 사람의 정보와 대조해서 count 계산
        int voteCount = voteUpCase(question, member, questionId);

        return voteCount;
    }
    //9 question 생성
    public Question createQuestion(Question question){

        //1. 현재 로그인 한 멤버 확인

        //2. question 생성
        verifyExistQuestion(question.getQuestionId());

        //3. 멤버 정보 생성 후 연결
        Member member = new Member("누구", "무엇", "무엇"); // 기능 구현 후 로그인정보에서 가져올것
        member.addQuestion(question);
        question.setMember(member);

        //4. vote 객체 생성 후 연결  ->  // cascade이용 db자동등록
        Vote vote = new Vote();
        vote.setQuestion(question);
        question.setVote(vote);

        //5. questionTag 객체 생성 후 연결
        return questionRepository.save(question);
    }

    //10 question 제거
    public void deleteQuestion(long questionId){
        Question question = findQuestion(questionId);
        questionRepository.delete(question);
    }

    // question이 DB에 존재하지 않으면 에러
    public Question findVerifiedQuestion(long questionId){
        Optional<Question> question = questionRepository.findById(questionId);
        Question findQuestion = question.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }

    // question이 DB에 존재하면 에러
    public void verifyExistQuestion(long questionId){
        Optional<Question> question = questionRepository.findById(questionId);
        if(question.isPresent())
            throw new BusinessLogicException(ExceptionCode.QUESTION_EXISTS);
    }

    // voteUp계산
    public int voteUpCase(Question question, Member member, long questionId){

        Map voteMap = question.getVote().getMemberVoteMap();
        if(voteMap.containsKey(member.getMemberId())){
            int value = ((Long)voteMap.get(member.getMemberId())).intValue();
            switch(value){
                case 1:
                    question.getVote().setVoteCount(question.getVote().getVoteCount()-1);
                    voteMap.put(member.getMemberId(), 0);
                case 0:
                    question.getVote().setVoteCount(question.getVote().getVoteCount()+1);
                    voteMap.put(member.getMemberId(), 1);
                case -1:
                    question.getVote().setVoteCount(question.getVote().getVoteCount()+1);
                    voteMap.put(member.getMemberId(), 0);
            }
        }
        else{
            question.getVote().setVoteCount(question.getVote().getVoteCount()+1);
            voteMap.put(member.getMemberId(), 1);
        }
        return question.getVote().getVoteCount();
    }
}
