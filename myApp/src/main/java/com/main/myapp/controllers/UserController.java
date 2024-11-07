package com.main.myapp.controllers;

import com.main.myapp.common.res.APIResponse;
import com.main.myapp.dto.user.CreateUserDto;
import com.main.myapp.dto.user.Login;
import com.main.myapp.dto.user.UserDto;
import com.main.myapp.service.OTPService;
import com.main.myapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private OTPService otpService;

    @PostMapping("/register")
    public APIResponse<UserDto> createUser(@Validated @RequestBody CreateUserDto input) {
        APIResponse<UserDto> response = new APIResponse<>();
        response.setCode(200);
        response.setMessage("Register successful");
        response.setData(userService.createUser(input));
        return response;
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public APIResponse<UserDto> login(@Validated @RequestBody Login input) {
        APIResponse<UserDto> response = new APIResponse<>();
        response.setCode(200);
        response.setMessage("Login successful");
        response.setData(userService.loginUser(input));
        return response;
    }

    @PostMapping("/otp")
    public String sendOtp(@RequestParam String phone ) {
        otpService.sendOTP(phone);
        return "OTP sent!";
    }

    @PostMapping("/verify")
    public APIResponse<Boolean> verifyOtp(@RequestParam String phone, @RequestParam String otp) {
        APIResponse<Boolean> response = new APIResponse<>();
        if(otpService.verifyOTP(phone, otp)){
            response.setCode(200);
            response.setMessage("OTP verified successfully");
            response.setData(true);
            return response;
        }
        response.setCode(200);
        response.setMessage("Invalid OTP");
        response.setData(false);
        return response;
    }



}
