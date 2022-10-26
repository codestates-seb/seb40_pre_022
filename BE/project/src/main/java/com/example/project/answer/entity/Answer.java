package com.example.project.answer.entity;

import com.example.project.audit.Auditable;
import com.example.project.member.entity.Member;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column
    private String body;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne
    private Vote vote;
}
