package com.example.project.member.entity;

import com.example.project.answer.entity.Answer;
import com.example.project.audit.Auditable;
import com.example.project.question.entity.Question;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Member extends Auditable {

    @Id
    @Column(name = "MEMBER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(name = "MEMBER_NAME")
    private String name;

    @Column(name = "MEMBER_EMAIL")
    private String email;

    @Column(name = "MEMBER_IMAGE")
    private String image;

    @Column(name = "MEMBER_PASSWORD")
    private String password;

    // 멤버의 현 상태
    @Enumerated(value = EnumType.STRING)
    @Column
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    // 이 사람이 쓴 질문들
    @OneToMany(mappedBy = "member")
    private List<Question> questions = new ArrayList<>();

    // 이 사람이 쓴 답변들
    @OneToMany(mappedBy = "member")
    private List<Answer> answers = new ArrayList<>();

    // 이 사람이 쓴 질문들 리스트에 추가
    public void addQuestion(Question question){
        questions.add(question);
    }

    public void addAnswer(Answer answer) {
        answers.add(answer);
    }


    // question 상세, 목록 페이지 응답시 mapper에서 responseDto에 담기 위함.
    public Member(String name, String email, String image){
        this.name = name;
        this.email = email;
        this.image = image;
    }

    // vote 테스트용
    public Member(long memberId){
        this.memberId = memberId;
    }

    // 멤버의 delete에서 사용하게 될 것. 멤버 상태에 대한 정의
    public enum MemberStatus{
        MEMBER_ACTIVE(1, "활동중"),
        MEMBER_SLEEP(2, "휴면 상태"),
        MEMBER_QUIT(3, "탈퇴 상태");

        @Getter
        private int status;

        @Getter
        private String message;

        MemberStatus(int status, String message) {
            this.status = status;
            this.message = message;
        }
    }
}
