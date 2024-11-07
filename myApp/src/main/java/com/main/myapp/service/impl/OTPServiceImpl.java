package com.main.myapp.service.impl;

import com.main.myapp.models.Otp.Otp;
import com.main.myapp.models.user.User;
import com.main.myapp.repository.OtpRepository;
import com.main.myapp.repository.UserRepository;
import com.main.myapp.service.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Random;

@Component
public class OTPServiceImpl implements OTPService {
    @Value("${telegram.bot.token}")
    private String botToken;
    @Value("${telegram.bot.chatId}")
    private String chatId;
    @Autowired
    private OtpRepository otpRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void sendOTP(String phone) {
        if(otpRepository.findByPhone(phone) != null){
            otpRepository.delete(otpRepository.findByPhone(phone));
        }
        String otp = generateOtp();
        Otp objOtp = new Otp();
        objOtp.setPhone(phone);
        objOtp.setOtp(otp);
        otpRepository.save(objOtp);
        String message = "Phone number: " + phone +",OTP is: " + otp;
        String url = "https://api.telegram.org/bot" + botToken + "/sendMessage?chat_id=" + chatId + "&text=" + message;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getForObject(url, String.class);
    }


    @Override
    public boolean verifyOTP(String phone, String otp) {
        Otp objOtp = otpRepository.findByPhoneAndOtp(phone, otp);
        if(objOtp != null){
            otpRepository.delete(objOtp);
            User user = userRepository.findByPhone(phone);
            user.setIsActived(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    private String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }
}
