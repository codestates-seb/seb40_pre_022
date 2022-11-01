package com.example.project.question.controller;

import com.example.project.answer.entity.Answer;
import com.example.project.answer.service.AnswerService;
import com.example.project.dto.MultiResponseDto;
import com.example.project.dto.SingleResponseDto;
import com.example.project.question.dto.QuestionDto;
import com.example.project.question.entity.Question;
import com.example.project.question.mapper.QuestionMapper;
import com.example.project.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Validated
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper mapper;

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

    //3. 검색결과 페이지 url 토의 후 수정하기
    @GetMapping("questions/search_result")
    public ResponseEntity getQuestionsByKeword(@RequestParam String keyword,
                                               @RequestParam int page,
                                               @RequestParam int size){

        return null;
    }

    //4. question 상세 페이지
    @GetMapping("/questions/{question_Id}")
    public ResponseEntity getQuestion(@PathVariable("question_Id") @Positive long questionId){

        Question result = questionService.findQuestion(questionId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(result)), HttpStatus.OK);
    }

    //5. question 수정을 위한 글 불러오기
    @GetMapping("/questions/edit/{question_Id}")
    public ResponseEntity getQuestionForUpdate(@PathVariable("question_Id") @Positive long questionId){

        Question result = questionService.findQuestionForUpdate(questionId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToQuestionForUpdateResponseDto(result)), HttpStatus.OK);
    }

    //6. question 수정
    @PatchMapping("/questions/{question_Id}")
    public ResponseEntity patchQuestion(@PathVariable("question_Id") long questionId,
                                        @Valid @RequestBody QuestionDto.Patch questionPatchDto){

        Question result = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(questionPatchDto));

        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(result)), HttpStatus.OK);
    }

    //7. question 추천 올리기
    @PatchMapping("/questions/vote_up/{question_Id}")
    public ResponseEntity patchVoteUp(@PathVariable("question_Id") long questionId,
                                      @Valid @RequestBody QuestionDto.QuestionVotePatch requestBody){

        Question question = questionService.questionVoteUp(mapper.questionVotePatchToQuestion(requestBody));

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.questionToVoteResponse(question)), HttpStatus.OK);
    }

    //8. question 추천 내리기 - **url수정이나 dto안의 필드 requestparam 수정 가능.
    @PatchMapping("/questions/vote_down/{question_Id}")
    public ResponseEntity patchVoteDown(@PathVariable("question_Id") long questionId,
                                        @Valid @RequestBody QuestionDto.QuestionVotePatch requestBody){

        Question question = questionService.questionVoteDown(mapper.questionVotePatchToQuestion(requestBody));

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.questionToVoteResponse(question)), HttpStatus.OK);
    }

    //9. question 작성 요청
    @PostMapping("/questions/ask/submit")
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post questionPostDto){

        Question result = questionService.createQuestion(mapper.questionPostDtoToQuestion(questionPostDto));

        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(result)), HttpStatus.CREATED);
    }

    //10. question 삭제 요청
    @DeleteMapping("/questions/{question_Id}")
    public ResponseEntity deleteQuestion(@PathVariable("question_Id") long questionId){

        questionService.deleteQuestion(questionId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
