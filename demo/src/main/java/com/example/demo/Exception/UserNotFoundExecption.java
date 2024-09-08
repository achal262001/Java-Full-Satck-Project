package com.example.demo.Exception;

public class UserNotFoundExecption extends RuntimeException{
    public UserNotFoundExecption(Long id){
        super("Could not found the user with id"+id);
    }
}
