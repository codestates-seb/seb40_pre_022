package com.example.project.question.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class QuestionDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionPatchDto {

        long questionId;
        String title;
        String body;
        List<String> tags;

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionPostDto {

        String title;
        String body;
        List<String> tags;

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RecommendPatchDto {

        long questionId;
        int vote;

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionResponseDto {

        long questionId;
        String title;
        String body;
        int voteCount;
        int viewCount;
        //Member member;
        //List<Question_tag> tags;
        //List<Answer> answer;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RecommendResponseDto {

        int vote;

    }
}
