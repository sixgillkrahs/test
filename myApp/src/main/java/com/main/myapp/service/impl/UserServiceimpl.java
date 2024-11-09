package com.main.myapp.service.impl;


import com.main.myapp.dto.user.CreateUserDto;
import com.main.myapp.dto.user.Login;
import com.main.myapp.dto.user.UpdateUserDto;
import com.main.myapp.dto.user.UserDto;
import com.main.myapp.exceptions.ErrorCode;
import com.main.myapp.exceptions.HandleRuntimeException;
import com.main.myapp.models.user.User;
import com.main.myapp.repository.UserRepository;
import com.main.myapp.service.OTPService;
import com.main.myapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceimpl implements UserService {

    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private OTPService otpService;

    @Override
    public UserDto createUser(CreateUserDto input) {
        if(userRepository.findByUsername(input.getUsername()) != null){
            throw new HandleRuntimeException(ErrorCode.USER_ALREADY_EXISTS);
        }
        if(userRepository.findByPhone(input.getPhone()) != null){
            throw new HandleRuntimeException(ErrorCode.USER_ALREADY_EXISTS);
        }
        try {
             User user = new User();
             user.setUsername(input.getUsername());
             user.setEmail(input.getEmail());
             user.setPhone(input.getPhone());
             user.setPassword(input.getPassword());
             user.setIsActived(false);
             otpService.sendOTP(input.getPhone());
             userRepository.save(user);
             UserDto userDto = new UserDto();
             userDto.setId(user.getId());
             userDto.setUsername(user.getUsername());
             userDto.setEmail(user.getEmail());
             userDto.setPhone(user.getPhone());
             userDto.setIsActived(user.getIsActived());
             return userDto;
        } catch (Exception e) {
            throw new HandleRuntimeException(ErrorCode.FAILED);
        }
    }

    @Override
    public UserDto getUserById(UUID id) {
        User user = userRepository.findById(id).orElse(null);
        if(user == null){
            throw new HandleRuntimeException(ErrorCode.ITEM_NOT_FOUND);
        }
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());
        userDto.setIsActived(user.getIsActived());
        return userDto;
    }

    @Override
    public UserDto loginUser(Login input) {
        User user = userRepository.findByEmail(input.getEmail());
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());
        userDto.setIsActived(user.getIsActived());
        if(user == null){
            throw new HandleRuntimeException(ErrorCode.ITEM_NOT_FOUND);
        }
        if(!user.getPassword().equals(input.getPassword())){
            throw new HandleRuntimeException(ErrorCode.FAILED);
        }
        if(!user.getIsActived()){
            otpService.sendOTP(user.getPhone());
            return userDto;
        }
        return userDto;
    }

    @Override
    public UserDto updateUserById(UUID id, UpdateUserDto input) {
        User user = userRepository.findById(id).orElse(null);
        if(user == null){
            throw new HandleRuntimeException(ErrorCode.ITEM_NOT_FOUND);
        }
        user.setUsername(input.getUsername());
        user.setPassword(input.getPassword());
        userRepository.save(user);
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());
        userDto.setIsActived(user.getIsActived());
        return userDto;
    }

    @Override
    public void forgotPassword(String phone, String otp) {
        otpService.sendNewPassword(phone, otp);
    }
}
