package com.example.project.question.dto;

import com.example.project.answer.entity.Answer;
import com.example.project.dto.MultiResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
// 수정 - private 지정자 : ver 1.1
public class QuestionDto {

    //질문 수정시 사용될 patchDto - checked
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {

        private long questionId;
        private String title;
        private String body;
        private List<QuestionTagDto> questionTags;

    }

    //질문 작성시 사용될 PostDto - checked
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {

        private String title;
        private String body;
        private List<QuestionTagDto> questionTags;

    }

//    //질문 추천시 사용될 patchDto - checked
//    @Data
//    @AllArgsConstructor
//    @NoArgsConstructor
//    public static class RecommendPatchDto {
//
//        private long questionId;
//        private int voteCount;
//
//    }

    //질문 개별페이지(상세페이지)에 응답할 responseDto
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private long questionId;
        private String title;
        private String body;
        private int voteCount;
        private int viewCount;
        private QuestionMemberDto questionMemberDto;  // * 놓치지 말 것 (mapper에서 name, email, image userStatus만 담아야함 -> 생성자생성)
        private List<Answer> answers;
        private List<QuestionTagDto> questionTags;  // * 놓치지 말 것 (mapper에서 tagName만 담아야함 -> 생성자 생성)
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    //질문 목록에 응답할 responseDto
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionListResponse {

        private long questionId;
        private String title;
        private String body;
        private int voteCount;
        private int viewCount;
        private QuestionMemberDto questionMemberDto; // * mapper에서 name, email, image만 담아야 함 -> 생성자 생성)
        private List<QuestionTagDto> questionTags; // tagName만 가져오기
        private int answerCount;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    // 질문 수정을 위한 responseDto - 수정창
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionForUpdateResponse {

        private long questionId;
        private String title;
        private String body;
        private List<QuestionTagDto> questionTags; // name만 골라오기.

    }

    // 질문 추천수를 변경하기위한 request용도
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionVotePatch {  // 로그인 구현 하면 바뀔 수 있음. memberId넘길 필요가 없어서 (세션, 쿠키의 경우데 따라 다르겠지만)
        private long memberId;
        private long questionId;
    }

    //질문 추천 비추천 responseDto
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionVoteResponse {

        private int voteCheck;  // -1, 0, 1 좋아요 상태. (Front에서 추천 여부 달라고하긴했는데..)
        private int voteCount;  // 추천 수.

    }

    // 질문 responseDto에 tagName만 빼서 주기 위함
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionTagDto {
        private String questionTagName;
    }

    // 질문 responseDto에 member의 이름 이메일 이미지만 빼서 주기 위함
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionMemberDto {
        private String name;
        private String email;
        private String image;
    }
}