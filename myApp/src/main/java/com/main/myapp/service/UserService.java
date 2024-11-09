package com.main.myapp.service;

import com.main.myapp.dto.user.CreateUserDto;
import com.main.myapp.dto.user.Login;
import com.main.myapp.dto.user.UpdateUserDto;
import com.main.myapp.dto.user.UserDto;
import org.springframework.stereotype.Service;

import java.util.UUID;

public interface UserService {
    public UserDto createUser(CreateUserDto input);
    public UserDto getUserById(UUID id);
    public UserDto loginUser(Login input);
    public UserDto updateUserById(UUID id, UpdateUserDto input);
    public void forgotPassword(String phone, String otp);
}
