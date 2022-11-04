package com.example.project.member.service;

import com.example.project.member.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//@Service
//@Transactional
@RequiredArgsConstructor
public class SendMailService {

    private final JavaMailSender mailSender;

    /**
     * 실제 google SMTP를 사용하여 mail을 보내는 기능
     *
     */

    public void mailSend(MemberDto.ResetPasswordMail mail){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mail.getAddress());
        message.setFrom("admin@stackoverflow.com");
        message.setSubject(mail.getTitle());
        message.setText(mail.getBody());

        mailSender.send(message);
    }

}
