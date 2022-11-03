package com.example.project.member.mapper;

import com.example.project.answer.entity.Answer;
import com.example.project.member.dto.MemberDto;
import com.example.project.member.entity.Member;
import com.example.project.question.entity.Question;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.Post memberPostDto);
    Member memberPatchDtoToMember(MemberDto.Patch memberPatchDto);
    MemberDto.Response memberToMemberResponseDto(Member member);

    default MemberDto.MyPageResponse memberToMyPageResponse(Member member){
        MemberDto.MyPageResponse myPageResponse = new MemberDto.MyPageResponse();

        List<Question> questions = member.getQuestions();
        List<Answer> answers = member.getAnswers();

        List<Long> questionIds = questions.stream()
                        .map(question -> question.getQuestionId())
                                .collect(Collectors.toList());

        List<Long> answerIds = answers.stream()
                        .map(answer -> answer.getAnswerId())
                                .collect(Collectors.toList());

        System.out.println(questionIds);
        System.out.println(answerIds);

        MemberDto.QuestionResponse questionResponse = new MemberDto.QuestionResponse(questionIds, questions.size());
        myPageResponse.setQuestions(questionResponse);

        MemberDto.AnswerResponse answerResponse = new MemberDto.AnswerResponse(answerIds, answers.size());
        myPageResponse.setAnswers(answerResponse);

        return myPageResponse;
    }
}
