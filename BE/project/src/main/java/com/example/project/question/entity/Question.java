package com.example.project.question.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long questionId;

    @Column(nullable = false)
    String title;

    @Column(nullable = false)
    String body;

    @Column(nullable = false)
    int viewCount;
    //Vote vote;
    //Member member;
    //List<Answer> aList;


}
