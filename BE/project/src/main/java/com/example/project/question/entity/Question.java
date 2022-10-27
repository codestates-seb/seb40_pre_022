package com.example.project.question.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;  // private, long -> Long : ver 1.1

    @Column
    private String title;

    @Column
    private String body;

    @Column
    private Integer viewCount;

    //질문이 가지고 있는 사용된 태그들
    @OneToMany(mappedBy = "question")
    private List<QuestionTag> questionTags = new ArrayList<>();

    //사용된 태그를 추가하는 메서드
    public void addQuestionTag(QuestionTag questionTag){
        questionTags.add(questionTag);
    }
    //Vote vote;
    //Member member;
    //List<Answer> aList;


}
