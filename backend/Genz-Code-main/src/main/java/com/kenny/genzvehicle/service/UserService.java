package com.kenny.genzvehicle.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kenny.genzvehicle.model.User;
import com.kenny.genzvehicle.repo.UserRepo;

@Service
public class UserService {
    
    @Autowired
    public UserRepo ur;

    public User getByEmail(String email) {
        return ur.findByEmail(email)
                 .orElse(null);  // Return null if the user is not found
    }
}
