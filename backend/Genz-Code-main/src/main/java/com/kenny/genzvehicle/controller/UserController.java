package com.kenny.genzvehicle.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kenny.genzvehicle.model.User;
import com.kenny.genzvehicle.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173") 
public class UserController {

    @Autowired UserService us;
    @GetMapping("/get/{email}")
    public ResponseEntity<User> getBy(@PathVariable String email) {
        User user = us.getByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);  // Return 200 OK with the User object
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if User is not found
        }
    }

}
