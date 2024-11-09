package com.main.myapp.service;

public interface OTPService {
    public void sendOTP(String phone);
    public boolean verifyOTP(String phone, String otp);
    public void sendNewPassword(String phone, String otp);
}
