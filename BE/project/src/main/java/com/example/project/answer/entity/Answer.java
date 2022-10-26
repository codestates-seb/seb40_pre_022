package com.example.project.answer.entity;

import com.example.project.audit.Auditable;
import com.example.project.member.entity.Member;
import com.example.project.question.entity.Question;
import com.example.project.vote.entity.Vote;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Answer extends Auditable {
    @Id
    @Column(name = "answer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(name = "answer_body")
    private String body;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @OneToOne(mappedBy = "answer")
    @JoinColumn(name = "vote_id")
    private Vote vote;
}
