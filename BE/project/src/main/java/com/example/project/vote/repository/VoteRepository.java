package com.example.project.vote.repository;

import com.example.project.answer.entity.Answer;
import com.example.project.question.entity.Question;
import com.example.project.vote.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByAnswer(Answer answer);
    Optional<Vote> findByQuestion(Question question);
}
