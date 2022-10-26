package com.example.project.question.service;

import com.example.project.question.entity.Question;
import com.example.project.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    //1 메인페이지 위함
    public Page<Question> findQuestionsByViewCount(int page, int size){

        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("viewCount").descending()));
    }

    //2 question 목록 조회
    public Page<Question> findQuestions(int page, int size){

        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    //3 키워드별 question 조회 + 추후 추가
    public Page<Question> findQuestionByKeyword(String keyword, int page, int size){


        return null;
    }

    //4 상세페이지
    public Question findQuestion(long questionId){

        Question question = findVerifiedQuestion(questionId);

        return question;
    }

    //5 수정 위해 question 불러올때
    public Question findQuestionForUpdate(long questionId){

        //1. member가 존재하는지 여부
        //2. member가 이 글의 작성자와 일치하는지 여부
        return findQuestion(questionId);
    }

    //6 수정
    public Question updateQuestion(Question question){

        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getBody())
                .ifPresent(body -> findQuestion.setBody(body));

        return questionRepository.save(findQuestion);
    }

    //7,8 질문 추천 올리기 내리기 + 추후 작성

    //9 question 생성
    public Question createQuestion(Question question){

        verifyExistQuestion(question.getQuestionId());

        return questionRepository.save(question);
    }

    //10 question 제거
    public void deleteQuestion(long questionId){
        Question question = findQuestion(questionId);
        questionRepository.delete(question);
    }

    // DB에 존재하지 않으면 에러
    public Question findVerifiedQuestion(long questionId){
        Optional<Question> question = questionRepository.findById(questionId);

        Question findQuestion = question.orElseThrow(() -> new RuntimeException());

        return findQuestion;
    }

    // DB에 존재하면 에러
    public void verifyExistQuestion(long questionId){
        Optional<Question> question = questionRepository.findById(questionId);
        if(question.isPresent())
            throw new RuntimeException();
    }
}
