package com.main.myapp.controllers;

import com.main.myapp.common.res.APIResponse;
import com.main.myapp.dto.user.CreateUserDto;
import com.main.myapp.dto.user.Login;
import com.main.myapp.dto.user.UpdateUserDto;
import com.main.myapp.dto.user.UserDto;
import com.main.myapp.service.OTPService;
import com.main.myapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Random;
import java.util.UUID;

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
    public APIResponse<Boolean> sendOtp(@RequestParam String phone ) {
        APIResponse<Boolean> response = new APIResponse<>();
        otpService.sendOTP(phone);
        response.setCode(200);
        response.setMessage("OTP sent!");
        response.setData(true);
        return response;
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

    @GetMapping("/detail")
    public APIResponse<UserDto> getDetailUser(@RequestParam String id) {
        APIResponse<UserDto> response = new APIResponse<>();
        response.setCode(200);
        response.setMessage("Get user detail successfully");
        response.setData(userService.getUserById(UUID.fromString(id)));
        return response;
    }

    @PutMapping("/update/{id}")
    public APIResponse<UserDto> updateUser(@PathVariable UUID id , @Validated @RequestBody UpdateUserDto input) {
        APIResponse<UserDto> response = new APIResponse<>();
        response.setCode(200);
        response.setMessage("update user successfully");
        response.setData(userService.updateUserById(id,input));
        return response;
    }

    @PostMapping("/forgot-password")
    public APIResponse<Boolean> forgotPassword(@RequestParam String phone, @RequestParam String otp) {
        APIResponse<Boolean> response = new APIResponse<>();
        otpService.sendNewPassword(phone, otp);
        response.setCode(200);
        response.setMessage("New password sent!");
        response.setData(true);
        return response;
    }



}
