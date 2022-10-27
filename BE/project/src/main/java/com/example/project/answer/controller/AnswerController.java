package com.example.project.answer.controller;

import com.example.project.answer.dto.AnswerDto;
import com.example.project.answer.entity.Answer;
import com.example.project.answer.mapper.AnswerMapper;
import com.example.project.answer.service.AnswerService;
import com.example.project.dto.SingleResponseDto;
import com.example.project.vote.entity.Vote;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/questions")    // fixme : / 로 할지, /questions로 할지.
@Validated
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;
    private final AnswerMapper mapper;

    // 1. 답변 등록
    @PostMapping("/{questionId}/answers")
    public ResponseEntity postAnswer(@PathVariable long questionId,
            @Valid @RequestBody AnswerDto.Post requestBody){
        requestBody.setQuestionId(questionId);
        Answer answer = mapper.answerPostToAnswer(requestBody);
        answer.setVote(new Vote());

        Answer createdAnswer = answerService.createAnswer(answer);
        AnswerDto.Response response = mapper.answerToAnswerResponse(createdAnswer);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED
        );
    }

    // 2. 답변 수정
    @PatchMapping("/{questionId}/answers/{answerId}")
    public ResponseEntity patchAnswer(@PathVariable long questionId,
                                      @PathVariable long answerId,
                                      @Valid @RequestBody AnswerDto.Patch requestBody){
        requestBody.setAnswerId(answerId);
        Answer answer = answerService.updateAnswer(mapper.answerPatchToAnswer(requestBody));

        AnswerDto.Response response = mapper.answerToAnswerResponse(answer);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    // Answer get test용입니다. 구현대상 X

    @GetMapping("/{questionId}/answers/{answerId}")
    public ResponseEntity getAnswer(@PathVariable long questionId,
                                    @PathVariable long answerId){
        Answer answer = answerService.findAnswer(answerId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToAnswerResponse(answer)),
                HttpStatus.OK
        );
    }

    // 추천하려는 member,
    //
    // 3. 답변 추천 up,down     미구현
    @PatchMapping("/{questionId}/answers/vote/{answerId}")
    public ResponseEntity patchAnswerVoteUp(@PathVariable long questionId,
                                          @PathVariable long answerId,
                                          @Valid @RequestBody AnswerDto.AnswerVotePatch requestBody){
        requestBody.setAnswerId(answerId);


        Vote vote = answerService.voteUp(mapper.answerVotePatchToVote(requestBody),
                requestBody.getMemberId(),
                requestBody.getVoteCheck());



        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.voteToVoteResponse(vote)),
                HttpStatus.OK
        );
    }

    // 5. 답변 채택
    // (ㄱ) 채택하려는 member,
    // (ㄴ) 답변의 member,
    // (ㄷ) 질문의 member.
    // 우리가 검증해야 하는 것은, ㄱ과 ㄷ이 같냐?
    // 그냥 전체 다 service로 넘겨서 로직을 처리해도 되는것인가?
    @PatchMapping("/{questionId}/answers/check/{answerId}")
    public ResponseEntity patchAnswerAccept(@PathVariable long questionId,
                                           @PathVariable long answerId,
                                           @Valid @RequestBody AnswerDto.AcceptPatch requestBody){

        answerService.acceptAnswer(requestBody.getMemberId(), questionId, answerId);

        // 추가 구현

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 6. 답변 삭제
    @DeleteMapping("/{questionId}/answers/{answerId}")
    public ResponseEntity deleteAnswer(@PathVariable long questionId,
                                       @PathVariable long answerId){
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
