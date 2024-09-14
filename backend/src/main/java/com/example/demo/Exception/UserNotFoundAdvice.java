package com.example.demo.Exception;

import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@ControllerAdvice
public class UserNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(UserNotFoundExecption.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String,String> exceptionHandler(UserNotFoundExecption execption){

        Map<String,String> errorMap=new HashMap<>();
        errorMap.put("errorMessage",execption.getMessage());

        return errorMap;
    }
}
