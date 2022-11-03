package com.example.project.question.controller;

import com.example.project.answer.entity.Answer;
import com.example.project.answer.service.AnswerService;
import com.example.project.dto.MultiResponseDto;
import com.example.project.dto.SingleResponseDto;
import com.example.project.question.dto.QuestionDto;
import com.example.project.question.entity.Question;
import com.example.project.question.mapper.QuestionMapper;
import com.example.project.question.service.QuestionService;
import com.example.project.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Validated
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper mapper;
    private final JwtTokenizer jwtTokenizer;

    /**
     * 기능 : 추천수로 정렬한 question 리스트 반환
     */
    @GetMapping
    public ResponseEntity getQuestionsByViewCount(@RequestParam int page,
                                                  @RequestParam int size){

        Page<Question> result = questionService.findQuestionsByViewCount(page-1, size);
        List<QuestionDto.QuestionListResponse> lists = result.getContent().stream()
                .map(list -> mapper.questionToQuestionListResponseDto(list))
                .collect(Collectors.toList());

        return new ResponseEntity(new MultiResponseDto<>(lists, result), HttpStatus.OK);
    }

    /**
     * 기능 : 최신순으로로 정렬한 question 리스트 반환
     */
    @GetMapping("/questions")
    public ResponseEntity getQuestions(@RequestParam int page,
                                       @RequestParam int size){

        Page<Question> result = questionService.findQuestions(page-1, size);
        List<QuestionDto.QuestionListResponse> lists = result.getContent().stream()
                .map(list -> mapper.questionToQuestionListResponseDto(list))
                .collect(Collectors.toList());

        return new ResponseEntity(new MultiResponseDto<>(lists, result), HttpStatus.OK);
    }

    //todo : keyword로 검색하여 최신순으로 반환한다.
    @GetMapping("questions/search_result")
    public ResponseEntity getQuestionsByKeword(@RequestParam String keyword,
                                               @RequestParam int page,
                                               @RequestParam int size){

        return null;
    }

    /**
     * 기능 : question 상세 페이지
     */
    @GetMapping("/questions/{question_Id}")
    public ResponseEntity getQuestion(@PathVariable("question_Id") @Positive long questionId){

        Question result = questionService.findQuestion(questionId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(result)), HttpStatus.OK);
    }

    /**
     * 기능 : question 수정을 위한(수정 바로 직전 단계) 글 불러오기
     */
    @GetMapping("/questions/edit/{question_Id}")

    public ResponseEntity getQuestionForUpdate(HttpServletRequest request,
                                               @PathVariable("question_Id") long questionId){
        String memberEmail = extractMemberEmail(request);
        Question result = questionService.findQuestionForUpdate(questionId, memberEmail);

        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToQuestionForUpdateResponseDto(result)), HttpStatus.OK);
    }

    /**
     * 기능 : question 수정
     */
    @PatchMapping("/questions/{question_Id}")

    public ResponseEntity patchQuestion(HttpServletRequest request,
                                        @PathVariable("question_Id") long questionId,
                                        @RequestBody QuestionDto.Patch questionPatchDto){
        String memberEmail = extractMemberEmail(request);
        Question result = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(questionPatchDto), memberEmail);

        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(result)), HttpStatus.OK);
    }

    /**
     * 기능 : question 추천
     */
    @PatchMapping("/questions/vote_up/{question_Id}")
    public ResponseEntity patchVoteUp(HttpServletRequest request,
                                      @PathVariable("question_Id") long questionId,
                                      @Valid @RequestBody QuestionDto.QuestionVotePatch requestBody){

        String memberEmail = extractMemberEmail(request);
        Question question = questionService.questionVoteUp(mapper.questionVotePatchToQuestion(requestBody), memberEmail);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.questionToVoteResponse(question)), HttpStatus.OK);
    }

    /**
     * 기능 : question 비추천
     */
    @PatchMapping("/questions/vote_down/{question_Id}")
    public ResponseEntity patchVoteDown(HttpServletRequest request,
                                        @PathVariable("question_Id") long questionId,
                                        @Valid @RequestBody QuestionDto.QuestionVotePatch requestBody){

        String memberEmail = extractMemberEmail(request);
        Question question = questionService.questionVoteDown(mapper.questionVotePatchToQuestion(requestBody),memberEmail);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.questionToVoteResponse(question)), HttpStatus.OK);
    }

    /**
     * 기능 : question 작성
     */
    @PostMapping("/questions/ask/submit")

    public ResponseEntity postQuestion(HttpServletRequest request,
                                       @RequestBody QuestionDto.Post questionPostDto){

        String memberEmail = extractMemberEmail(request);
        Question result = questionService.createQuestion(mapper.questionPostDtoToQuestion(questionPostDto),memberEmail);

        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(result)), HttpStatus.CREATED);
    }

    /**
     * 기능 : question 삭제
     */
    @DeleteMapping("/questions/{question_Id}")
    public ResponseEntity deleteQuestion(HttpServletRequest request,
                                         @PathVariable("question_Id") long questionId){

        String memberEmail = extractMemberEmail(request);
        questionService.deleteQuestion(questionId, memberEmail);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    /**
     * 메서드 : email정보를 추출한다.
     * @return request 헤더의 토큰에서 추출한 로그인 유저의 email정보
     */
    private String extractMemberEmail(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody().getSubject();
    }
}
