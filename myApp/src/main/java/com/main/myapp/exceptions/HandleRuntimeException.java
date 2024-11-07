package com.main.myapp.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HandleRuntimeException extends RuntimeException{
    public HandleRuntimeException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
    private ErrorCode errorCode;
}
