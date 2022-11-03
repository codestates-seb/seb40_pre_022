package com.example.project.question.controller;

import com.example.project.answer.entity.Answer;
import com.example.project.answer.service.AnswerService;
import com.example.project.dto.MultiResponseDto;
import com.example.project.dto.PageInfo;
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

    //1. 메인페이지
    @GetMapping
    public ResponseEntity getQuestionsByViewCount(@RequestParam int page,
                                                  @RequestParam int size){

        Page<Question> result = questionService.findQuestionsByViewCount(page-1, size);
        List<QuestionDto.QuestionListResponse> lists = result.getContent().stream()
                .map(list -> mapper.questionToQuestionListResponseDto(list))
                .collect(Collectors.toList());

        return new ResponseEntity(new MultiResponseDto<>(lists, result), HttpStatus.OK);
    }

    //2. all question 목록 제공
    @GetMapping("/questions")
    public ResponseEntity getQuestions(@RequestParam int page,
                                       @RequestParam int size){

        Page<Question> result = questionService.findQuestions(page-1, size);
        List<QuestionDto.QuestionListResponse> lists = result.getContent().stream()
                .map(list -> mapper.questionToQuestionListResponseDto(list))
                .collect(Collectors.toList());

        return new ResponseEntity(new MultiResponseDto<>(lists, result), HttpStatus.OK);
    }

    //3. 검색결과 페이지
    @GetMapping("/questions/search_result")
    public ResponseEntity getQuestionsByKeyword(@RequestParam(value = "keyword") String keyword,
                                               @RequestParam int page,
                                               @RequestParam int size){


        Page<Question> result = questionService.findQuestionByKeyword(keyword, page-1, size);

        List<QuestionDto.QuestionListResponse> lists = result.getContent().stream()
                .map(list -> mapper.questionToQuestionListResponseDto(list))
                .collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResponseDto<>(lists, result), HttpStatus.OK);
    }

    //4. question 상세 페이지
    @GetMapping("/questions/{question_Id}")
    public ResponseEntity getQuestion(@PathVariable("question_Id") @Positive long questionId){

        Question result = questionService.findQuestion(questionId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(result)), HttpStatus.OK);
    }

    //5. question 수정을 위한 글 불러오기
    @GetMapping("/questions/edit/{question_Id}")

    public ResponseEntity getQuestionForUpdate(HttpServletRequest request,
                                               @PathVariable("question_Id") long questionId){
        String memberEmail = extractMemberEmail(request);
        Question result = questionService.findQuestionForUpdate(questionId, memberEmail);

        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToQuestionForUpdateResponseDto(result)), HttpStatus.OK);
    }

    //6. question 수정
    @PatchMapping("/questions/{question_Id}")

    public ResponseEntity patchQuestion(HttpServletRequest request,
                                        @PathVariable("question_Id") long questionId,
                                        @RequestBody QuestionDto.Patch questionPatchDto){
        String memberEmail = extractMemberEmail(request);
        Question result = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(questionPatchDto), memberEmail);

        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(result)), HttpStatus.OK);
    }

    //7. question 추천 올리기
    @PatchMapping("/questions/vote_up/{question_Id}")
    public ResponseEntity patchVoteUp(HttpServletRequest request,
                                      @PathVariable("question_Id") long questionId,
                                      @Valid @RequestBody QuestionDto.QuestionVotePatch requestBody){

        String memberEmail = extractMemberEmail(request);
        Question question = questionService.questionVoteUp(mapper.questionVotePatchToQuestion(requestBody), memberEmail);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.questionToVoteResponse(question)), HttpStatus.OK);
    }

    //8. question 추천 내리기 - **url수정이나 dto안의 필드 requestparam 수정 가능.
    @PatchMapping("/questions/vote_down/{question_Id}")
    public ResponseEntity patchVoteDown(HttpServletRequest request,
                                        @PathVariable("question_Id") long questionId,
                                        @Valid @RequestBody QuestionDto.QuestionVotePatch requestBody){

        String memberEmail = extractMemberEmail(request);
        Question question = questionService.questionVoteDown(mapper.questionVotePatchToQuestion(requestBody),memberEmail);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.questionToVoteResponse(question)), HttpStatus.OK);
    }

    //9. question 작성 요청
    @PostMapping("/questions/ask/submit")

    public ResponseEntity postQuestion(HttpServletRequest request,
                                       @RequestBody QuestionDto.Post questionPostDto){

        String memberEmail = extractMemberEmail(request);
        Question result = questionService.createQuestion(mapper.questionPostDtoToQuestion(questionPostDto),memberEmail);

        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(result)), HttpStatus.CREATED);
    }

    //10. question 삭제 요청
    @DeleteMapping("/questions/{question_Id}")
    public ResponseEntity deleteQuestion(HttpServletRequest request,
                                         @PathVariable("question_Id") long questionId){

        String memberEmail = extractMemberEmail(request);
        questionService.deleteQuestion(questionId, memberEmail);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    private String extractMemberEmail(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody().getSubject();
    }
}
