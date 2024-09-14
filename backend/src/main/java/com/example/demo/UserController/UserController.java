package com.example.demo.UserController;

import com.example.demo.Entity.User;
import java.util.*;

import com.example.demo.Exception.UserNotFoundExecption;
import com.example.demo.UserRepository.UserRepository;
import com.example.demo.UserService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public User addUser(@RequestBody User newuser){
//        return userRepository.save(newuser);
        return userService.addUser(newuser);
    }
    @GetMapping("/user")
    public  List<User> getAllUser(){
        return userService.getUsers();
//        return userRepository.findAll();
    }
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id){
//        return userRepository.findById(id).orElseThrow(()->new UserNotFoundExecption(id));
        return userService.getUserById(id);
    }
    @PutMapping("/user/{id}")
    private User updateUser(@RequestBody User newUser,@PathVariable Long id){
        return userService.putUser(id,newUser);
//        return userRepository.findById(id)
//                .map(user ->{
//                    user.setEmail(newUser.getEmail());
//                    user.setName(newUser.getName());
//                    user.setPhoneNumber(newUser.getPhoneNumber());
//                    return userRepository.save(user);
//                }).orElseThrow(()->new UserNotFoundExecption(id));
    }

    @DeleteMapping("/user/{id}")
    private String deleteUser(@PathVariable Long id){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundExecption(id);
        }
        userRepository.deleteById(id);
        return "User with id " +id+" has been deleted successfully";
    }
}
