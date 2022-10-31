package com.example.project.question.repository;

import com.example.project.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    Optional<Question> findByTitleContaining(String keyword);
    Optional<Question> findByBodyContaining(String keyword);
}
