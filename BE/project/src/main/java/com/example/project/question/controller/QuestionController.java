package com.example.project.question.controller;

import com.example.project.question.dto.QuestionDto;
import com.example.project.question.entity.Question;
import com.example.project.question.mapper.QuestionMapper;
import com.example.project.question.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper mapper;

    public QuestionController(QuestionService questionService, QuestionMapper mapper) {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    //1. 메인페이지
    @GetMapping
    public ResponseEntity getQuestionsByViewCount(@RequestParam int page,
                                                  @RequestParam int size){

        Page<Question> result = questionService.findQuestionsByViewCount(page-1, size);
        List<QuestionDto.QuestionResponseDto> lists = result.getContent().stream()
                .map(list -> mapper.QuestionToQuestionResponseDto(list))
                .collect(Collectors.toList());

        return new ResponseEntity(lists, HttpStatus.OK);
    }

    //2. all question 목록 제공
    @GetMapping("/questions")
    public ResponseEntity getQuestions(@RequestParam int page,
                                       @RequestParam int size){

        Page<Question> result = questionService.findQuestions(page-1, size);
        List<QuestionDto.QuestionResponseDto> lists = result.getContent().stream()
                .map(list -> mapper.QuestionToQuestionResponseDto(list))
                .collect(Collectors.toList());

        return new ResponseEntity(lists, HttpStatus.OK);
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
    public ResponseEntity getQuestion(@PathVariable("question_Id") long questionId){

        Question result = questionService.findQuestion(questionId);

        return new ResponseEntity(result, HttpStatus.OK);
    }

    //5. question 수정을 위한 글 불러오기
    @GetMapping("/questions/edit/{question_Id}")
    public ResponseEntity getQuestionForUpdate(@PathVariable("question_Id") long questionId){

        Question result = questionService.findQuestionForUpdate(questionId);

        return new ResponseEntity(result, HttpStatus.OK);
    }

    //6. question 수정
    @PatchMapping("/questions/{question_Id}")
    public ResponseEntity patchQuestion(@PathVariable("question_Id") long questionId,
                                        @RequestBody QuestionDto.QuestionPatchDto questionPatchDto){

        Question result = questionService.updateQuestion(mapper.QuestionPatchDtoToQuestion(questionPatchDto));

        return new ResponseEntity(result, HttpStatus.OK);
    }

    //7. question 추천 올리기 + 추후 추가
    @PatchMapping("/questions/vote_up/{question_Id}")
    public ResponseEntity patchVoteUp(@PathVariable("question_Id") long questionId,
                                    @RequestBody QuestionDto.RecommendPatchDto recommendPatchDto){

        return null;
    }

    //8. question 추천 내리기 + 추후 추가
    @PatchMapping("/questions/vote_down/{question_Id}")
    public ResponseEntity patchVoteDown(@PathVariable("question_Id") long questionId,
                                        @RequestBody QuestionDto.RecommendPatchDto recommendPatchDto){

        return null;
    }

    //9. question 작성 요청
    @PostMapping("/questions/ask/submit")
    public ResponseEntity postQuestion(@RequestBody QuestionDto.QuestionPostDto questionPostDto){

        Question result = questionService.createQuestion(mapper.QuestionPostDtoToQuestion(questionPostDto));

        return new ResponseEntity(result, HttpStatus.CREATED);
    }

    //10. question 삭제 요청
    @DeleteMapping("/questions/{question_Id}")
    public ResponseEntity deleteQuestion(@PathVariable("question_Id") long questionId){

        questionService.deleteQuestion(questionId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
