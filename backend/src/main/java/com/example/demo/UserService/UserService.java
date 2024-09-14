package com.example.demo.UserService;

import com.example.demo.Entity.User;
import com.example.demo.Exception.UserNotFoundExecption;
import com.example.demo.UserRepository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

//    @Autowired
    public  UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }
    public User addUser(User newUser){
        return userRepository.save(newUser);
    }
    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(()-> new UserNotFoundExecption(id));
    }
    public User putUser(Long id,User newUser){
        return userRepository.findById(id).map(user -> {
            user.setName(newUser.getName());
            user.setPhoneNumber((newUser.getPhoneNumber()));
            user.setEmail(newUser.getEmail());
            return userRepository.save(newUser);
        }).orElseThrow(()->new UserNotFoundExecption(id));
    }
    public String deleteUser(Long id){
//        if(!userRepository.findById(id)){
//            throw new UserNotFoundExecption(id);
//        }
        userRepository.deleteById(id);
        return "The Given User "+id + " is deleted from DataBase+";
    }
}
