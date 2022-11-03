package com.example.project.question.repository;

import com.example.project.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    // title 검색처리
    List<Question> findByTitleContainingIgnoreCase(String title);
    List<Question> findByTitleContainingIgnoreCaseOrTitleContainingIgnoreCase(String title, String title2);
    List<Question> findByTitleContainingIgnoreCaseOrTitleContainingIgnoreCaseOrTitleContainingIgnoreCase(String title, String title2, String title3);
    List<Question> findByTitleContainingIgnoreCaseOrTitleContainingIgnoreCaseOrTitleContainingIgnoreCaseOrTitleContainingIgnoreCase(String title, String title2, String title3, String title4);

    // body 검색처리
    List<Question> findByBodyContainingIgnoreCase(String body);
    List<Question> findByBodyContainingIgnoreCaseOrBodyContainingIgnoreCase(String body1, String body2);
    List<Question> findByBodyContainingIgnoreCaseOrBodyContainingIgnoreCaseOrBodyContainingIgnoreCase(String body1, String body2, String body3);
    List<Question> findByBodyContainingIgnoreCaseOrBodyContainingIgnoreCaseOrBodyContainingIgnoreCaseOrBodyContainingIgnoreCase(String body1, String body2, String body3, String body4);





}
