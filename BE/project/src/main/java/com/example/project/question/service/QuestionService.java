package com.example.project.question.service;

import com.example.project.exception.BusinessLogicException;
import com.example.project.exception.ExceptionCode;
import com.example.project.member.entity.Member;
import com.example.project.member.service.MemberService;
import com.example.project.question.entity.Question;
import com.example.project.question.entity.QuestionTag;
import com.example.project.question.repository.QuestionRepository;
import com.example.project.tag.Tag;
import com.example.project.tag.TagRepository;
import com.example.project.vote.Vote;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MemberService memberService;
    private final TagRepository tagRepository;

    /**
     * 필수) question 리스트 반환 비즈니스 로직
     * -> 조회순으로 정렬하여 페이지네이션한다.
     */
    public Page<Question> findQuestionsByViewCount(int page, int size){
        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("viewCount").descending()));
    }

    /**
     * 필수) question 리스트 반환 비즈니스 로직
     * -> 최신순으로 정렬하여 페이지네이션한다.
     */
    public Page<Question> findQuestions(int page, int size){


        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    //3. 키워드별 question 조회 + 추후 추가
    public Page<Question> findQuestionByKeyword(String keyword, int page, int size) {

        // pageable을 만들긴 했으나, 여기에서 descending 해도 적용은 따로 안됨.
        Pageable pageable = PageRequest.of(page, size, Sort.by("questionId").descending());

        // 검색어 받은 내용을 띄어쓰기 단위로 분리
        List<String> keywords = Arrays.asList(keyword.split(" "));

        // 검색결과 임시 저장을 위한 List 생성
        List<Question> questions = new ArrayList<>();


        //title 검색
        switch (keywords.size()) {
            case 1:
                questions.addAll(questionRepository.findByTitleContainingIgnoreCase(keywords.get(0)));
                break;

            case 2:
                questions.addAll(questionRepository.findByTitleContainingIgnoreCaseOrTitleContainingIgnoreCase(keywords.get(0), keywords.get(1)));
                break;

            case 3:
                questions.addAll(questionRepository.findByTitleContainingIgnoreCaseOrTitleContainingIgnoreCaseOrTitleContainingIgnoreCase(keywords.get(0), keywords.get(1), keywords.get(2)));
                break;

            case 4:
                questions.addAll(questionRepository.findByTitleContainingIgnoreCaseOrTitleContainingIgnoreCaseOrTitleContainingIgnoreCaseOrTitleContainingIgnoreCase(keywords.get(0), keywords.get(1), keywords.get(2), keywords.get(3)));
                break;
        }

        //body 검색
        switch (keywords.size()) {
            case 1:
                questions.addAll(questionRepository.findByBodyContainingIgnoreCase(keywords.get(0)));
                break;

            case 2:
                questions.addAll(questionRepository.findByBodyContainingIgnoreCaseOrBodyContainingIgnoreCase(keywords.get(0), keywords.get(1)));
                break;

            case 3:
                questions.addAll(questionRepository.findByBodyContainingIgnoreCaseOrBodyContainingIgnoreCaseOrBodyContainingIgnoreCase(keywords.get(0), keywords.get(1), keywords.get(2)));
                break;

            case 4:
                questions.addAll(questionRepository.findByBodyContainingIgnoreCaseOrBodyContainingIgnoreCaseOrBodyContainingIgnoreCaseOrBodyContainingIgnoreCase(keywords.get(0), keywords.get(1), keywords.get(2), keywords.get(3)));
                break;
        }

        // title, body 중복제거를 위한 set<->list 변환
        Set<Question> questionSet = new HashSet<>(questions);
        List<Question> result = new ArrayList<>(questionSet);

        // questionId로 내림차순 정리 (최신순)
        result.sort(Collections.reverseOrder());

        return new PageImpl<>(result, pageable, result.size());
    }


    /**
     * 필수) 상세(개별)페이지 비즈니스 로직
     */
    public Question findQuestion(long questionId){


        Question question = findVerifiedQuestion(questionId);
        question.setViewCount(question.getViewCount() + 1); // 조회수 증가

        return questionRepository.save(question);
    }


    /**
     * 필수) question 수정 전 get 비즈니스 로직 - 수정하려면 그 글 자체를 먼저 불러와야함
     * 1. 로그인 유저가 질문의 작성자인지 확인한다.
     * 2. 질문을 DB로부터 가져온다.
     */
    public Question findQuestionForUpdate(long questionId, String memberEmail){

        if(!memberEmail.equals(findVerifiedQuestion(questionId).getMember().getEmail())) {

            throw new RuntimeException();
        }

        Question question = findQuestion(questionId);

        return question;
    }

    /**
     * 필수) question 수정 비즈니스 로직
     * 1. 로그인 유저가 질문의 작성자인지 확인한다.
     * 2. DTO로부터 넘겨받은 데이터들을 엎어쓴다.
     * 3. 저장한다.
     */
    public Question updateQuestion(Question question, String memberEmail){

        if(!memberEmail.equals(findVerifiedQuestion(question.getQuestionId()).getMember().getEmail())) {
            throw new RuntimeException();
        }

        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getBody())
                .ifPresent(body -> findQuestion.setBody(body));

        return questionRepository.save(findQuestion);
    }


    /**
     * 필수) question 추천 비즈니스 로직
     * 1. 유저의 존재여부를 DB에서 확인한다.
     * 2. 추천하고자 하는 질문을 DB에서 확인한다.
     * 3. voteUpCase를 통해 추천을 계산한다.
     * 4. 저장한다.
     */
    public Question questionVoteUp(Question question, String memberEmail){

        memberService.DoesMemberExist(memberEmail);

        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        voteUpCase(findQuestion, memberService.findExistMemberByEmail(memberEmail).getMemberId());

        return questionRepository.save(findQuestion);
    }


    /**
     * 필수) question 비추천 비즈니스 로직
     * 1. 유저의 존재여부를 DB에서 확인한다.
     * 2. 비추천하고자 하는 질문을 DB에서 확인한다.
     * 3. voteDownCase를 통해 추천을 계산한다.
     * 4. 저장한다.
     */
    public Question questionVoteDown(Question question, String memberEmail){

        memberService.DoesMemberExist(memberEmail);

        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        voteDownCase(findQuestion, memberService.findExistMemberByEmail(memberEmail).getMemberId());

        return questionRepository.save(findQuestion);
    }


    /**
     * 필수) question 생성 비즈니스 로직
     * 1. 로그인 유저의 정보를 DB에서 가져온다.
     * 2. 추후 추천수를 담을 vote 객체를 생성한다.
     * 3. 유저와 vote객체를 question과 연결한다.
     * 4. DTO로부터 받은 questionTag를 통해 Tag(분류)를 생성한다
     * 5. 질문 - questionTag - Tag를 연결한다.
     * 6. 저장한다.
     */
    public Question createQuestion(Question question, String memberEmail){

        Member member = memberService.findExistMemberByEmail(memberEmail);
        question.setMember(member);
        member.addQuestion(question);

        Vote vote = new Vote();
        vote.setQuestion(question);
        question.setVote(vote);


        List<QuestionTag> questionTags = question.getQuestionTags();
        for (int i = 0; i < questionTags.size(); i++) {
            boolean alreadyExistTag = findTag(questionTags.get(i).getQuestionTagName());

            if(alreadyExistTag == true){
                Tag tag = findTagByName(questionTags.get(i).getQuestionTagName());
                tag.setUsageCount(tag.getUsageCount() + 1);
//                tag.addQuestionTag(questionTags.get(i));
                questionTags.get(i).setTag(tag);
            }
            else{
                Tag tag = new Tag(questionTags.get(i).getQuestionTagName(), 1);
                tag.addQuestionTag(questionTags.get(i));
                questionTags.get(i).setTag(tag);
            }
        }

        return questionRepository.save(question);
    }


    /**
     * 필수) question 삭제 비즈니스 로직
     * 1. 로그인 유저가 질문 작성자인지 확인한다.
     * 2. 질문을 DB에서 삭제한다.
     */
    public void deleteQuestion(long questionId, String memberEmail){

        if(!memberEmail.equals(findVerifiedQuestion(questionId).getMember().getEmail())) {
            throw new RuntimeException();
        }
        Question question = findQuestion(questionId);
        List<QuestionTag> questionTags = question.getQuestionTags();
        for (int i = 0; i < questionTags.size(); i++) {
            boolean alreadyExistTag = findTag(questionTags.get(i).getQuestionTagName());

            if(alreadyExistTag == true){
                Tag tag = findTagByName(questionTags.get(i).getQuestionTagName());
                tag.setUsageCount(tag.getUsageCount() - 1);
//                tag.addQuestionTag(questionTags.get(i));
                questionTags.get(i).setTag(tag);
            }
        }
        questionRepository.save(question);
        questionRepository.delete(question);
    }


    /**
     * 도구) question이 DB에 존재하지 않으면 오류를 발생시키는 메서드
     * @return : Question 객체
     */
    public Question findVerifiedQuestion(long questionId){
        Optional<Question> question = questionRepository.findById(questionId);
        Question findQuestion = question.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }


    /**
     * 도구) question이 DB에 존재하면 오류를 발생시키는 메서드
     */
    public void verifyExistQuestion(long questionId){
        Optional<Question> question = questionRepository.findById(questionId);
        if (question.isPresent())
            throw new BusinessLogicException(ExceptionCode.QUESTION_EXISTS);
    }

    /**
     * 도구) vote 추천의 경우를 계산하는 메서드
     * 1. 해당 answer와 연결된 vote의 voteMap을 가져온다(유저의 과거 추천 저장)
     * 2. key와 value값으로 계산한다.
     * (answer의 추천과 동일로직)
     */
    public void voteUpCase(Question question, long memberId){
        Map<Long, Integer> voteMap = question.getVote().getMemberVoteMap();

        if(voteMap.containsKey(memberId)){
            int value = voteMap.get(memberId);
            switch(value){
                case 1:
                    question.getVote().setVoteCount(question.getVote().getVoteCount()-1);
                    voteMap.put(memberId, 0);
                    break;
                case 0:
                    question.getVote().setVoteCount(question.getVote().getVoteCount()+1);
                    voteMap.put(memberId, 1);
                    break;
                case -1:
                    question.getVote().setVoteCount(question.getVote().getVoteCount()+1);
                    voteMap.put(memberId, 0);
                    break;
            }
        } else {
            question.getVote().setVoteCount(question.getVote().getVoteCount() + 1);
            voteMap.put(memberId, 1);
        }
        question.getVote().setVoteCheck(voteMap.get(memberId));
    }

    /**
     * 도구) vote 비추천의 경우를 계산하는 메서드
     * 1. 해당 answer와 연결된 vote의 voteMap을 가져온다(유저의 과거 추천 저장)
     * 2. key와 value값으로 계산한다.
     * (answer의 비추천과 동일로직)
     */
    public void voteDownCase(Question question, long memberId){
        Map<Long, Integer> voteMap = question.getVote().getMemberVoteMap();

        if(voteMap.containsKey(memberId)){
            int value = voteMap.get(memberId);
            switch(value){
                case 1:
                    question.getVote().setVoteCount(question.getVote().getVoteCount()-1);
                    voteMap.put(memberId, 0);
                    break;
                case 0:
                    question.getVote().setVoteCount(question.getVote().getVoteCount()-1);
                    voteMap.put(memberId, -1);
                    break;
                case -1:
                    question.getVote().setVoteCount(question.getVote().getVoteCount()+1);
                    voteMap.put(memberId, 0);
                    break;
            }
        }
        else{
            question.getVote().setVoteCount(question.getVote().getVoteCount()-1); //
            voteMap.put(memberId, -1);
        }
        question.getVote().setVoteCheck(voteMap.get(memberId));
    }

    /**
     * 도구) Tag가 DB에 존재하는지 여부를 boolean값으로 확인
     * @return : boolean
     */
    public boolean findTag(String questionTagName){
        Optional<Tag> optionalTag = tagRepository.findByTagName(questionTagName);
        if(optionalTag.isPresent())
            return true;
        return false;
    }

    /**
     * 도구) Tag가 DB에 존재하는지 여부를 확인하는 메서드
     * @return : 존재한다면 Tag
     */
    public Tag findTagByName(String tagName){
        Optional<Tag> optionalTag = tagRepository.findByTagName(tagName);

        return optionalTag.orElseThrow(() -> new RuntimeException()); // fixme : exceptionCode설정
    }
}
