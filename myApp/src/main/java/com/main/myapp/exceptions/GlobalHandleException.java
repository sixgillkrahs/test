package com.main.myapp.exceptions;

import com.main.myapp.common.res.APIResponse;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@FieldDefaults(level = AccessLevel.PUBLIC)
public class GlobalHandleException extends RuntimeException {

    @ExceptionHandler(value = HandleRuntimeException.class)
    ResponseEntity<APIResponse> handleRuntimeException(HandleRuntimeException e){
        ErrorCode errorCode = e.getErrorCode();
        APIResponse response = new APIResponse();
        response.setCode(errorCode.getCode());
        response.setMessage(errorCode.getMessage());
        return ResponseEntity.badRequest().body(response);
    }




}
