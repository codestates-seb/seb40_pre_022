package com.example.project.question.repository;

import com.example.project.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    Page<Question> findByTitleContaining(String keyword, Pageable pageable);
    Page<Question> findByBodyContaining(String keyword, Pageable pageable);
    Page<Question> findByTagContaining(String keyword, Pageable pageable);
}
