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

import java.security.SecureRandom;
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
        if(userRepository.findByPhone(phone) == null){
            throw new RuntimeException("Phone number not found");
        }
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

    @Override
    public void sendNewPassword(String phone, String otp) {
        Otp objOtp = otpRepository.findByPhone(phone);
        if(!objOtp.getOtp().equals(otp)){
            throw new RuntimeException("Invalid OTP");
        }else{
            otpRepository.delete(objOtp);
        }
        User user = userRepository.findByPhone(phone);
        String newPass = generatePassword();
        user.setPassword(newPass);
        userRepository.save(user);
        String message = "Phone number: " + phone +",Email is: " + user.getEmail() + ",New password is: " + newPass;
        String url = "https://api.telegram.org/bot" + botToken + "/sendMessage?chat_id=" + chatId + "&text=" + message;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getForObject(url, String.class);
    }

    private String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

    private String generatePassword() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder randomString = new StringBuilder(10);
        for (int i = 0; i < 10; i++) {
            int index = random.nextInt(characters.length()); // Tạo số ngẫu nhiên để chọn ký tự
            randomString.append(characters.charAt(index)); // Thêm ký tự vào chuỗi
        }
        return randomString.toString();
    }
}
