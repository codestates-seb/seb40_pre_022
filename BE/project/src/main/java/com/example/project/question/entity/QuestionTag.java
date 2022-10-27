package com.example.project.question.entity;

import com.example.project.tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class QuestionTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionTagId;

    //사용된 태그가 속한 질문
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    //사용된 태그가 속한 태그분류
    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    //사용된 태그가 속한 질문을 추가하는 메서드
    public void addQuestion(Question question){
        this.question = question;
    }

    //사용된 태그가 속한 태그분류를 추가하는 메서드
    public void addTag(Tag tag){
        this.tag = tag;
    }

}
