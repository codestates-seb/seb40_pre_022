package com.example.project.answer.entity;

import com.example.project.audit.Auditable;
import com.example.project.member.entity.Member;
import com.example.project.question.entity.Question;
import com.example.project.vote.Vote;
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
    @Column(name = "ANSWER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(name = "ANSWER_BODY")
    private String body;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @OneToOne(mappedBy = "answer")
    @JoinColumn(name = "VOTE_ID")
    private Vote vote;
}
