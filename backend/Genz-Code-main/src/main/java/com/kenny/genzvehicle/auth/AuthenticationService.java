// package com.kenny.genzvehicle.auth;

// import com.kenny.genzvehicle.config.JwtService;
// import com.kenny.genzvehicle.model.Token;
// import com.kenny.genzvehicle.model.User;
// import com.kenny.genzvehicle.repo.TokenRepo;
// import com.kenny.genzvehicle.repo.UserRepo;
// import lombok.RequiredArgsConstructor;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// @RequiredArgsConstructor
// public class AuthenticationService {

//     private final UserRepo userRepo;
//     private final PasswordEncoder passwordEncoder;
//     private final JwtService jwtService;
//     private final AuthenticationManager authenticationManager;
//     private final TokenRepo tokenRepo;

//     public AuthenticationResponse register(RegisterRequest request) {
//         var user  = User.builder()
//                 .name(request.getName())
//                 .email(request.getEmail())
//                 .password(passwordEncoder.encode(request.getPassword()))
//                 .role(request.getRole())
//                 .build();
//         userRepo.save(user);
//         var jwtToken = jwtService.generateToken(user);
//         return AuthenticationResponse.builder()
//                 .token(jwtToken)
//                 .build();
//     }

//     public AuthenticationResponse authenticate(AuthenticationRequest request) {
//         authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(
//                         request.getEmail(),
//                         request.getPassword()
//                 )
//         );
//         var user = userRepo.findByEmail(request.getEmail()).orElseThrow();
//         var jwtToken = jwtService.generateToken(user);
//         revokeAllUserTokens(user);
//         saveUserToken(user, jwtToken);
//         return AuthenticationResponse.builder()
//                 .token(jwtToken)
//                 .role(user.getRole())
//                 .build();

//     }

//     private void saveUserToken(User user, String accessToken) {
//         var token = Token.builder().user(user).token(accessToken).expired(false).revoked(false).build();
//         tokenRepo.save(token);
//     }

//     private void revokeAllUserTokens(User user) {
//         var validUserTokens = tokenRepo.findAllByUser_IdAndExpiredFalseAndRevokedFalse(user.getId());
//         if (validUserTokens.isEmpty())
//             return;
//         validUserTokens.forEach(token -> {
//             token.setExpired(true);
//             token.setRevoked(true);
//         });
//         tokenRepo.saveAll(validUserTokens);
//     }

//     public void logout(String username) {
//         System.out.println("Logout Functionality Called");
//         var user = userRepo.findByEmail(username).orElseThrow();
//         revokeAllUserTokens(user);
//     }

// }
package com.kenny.genzvehicle.auth;

import com.kenny.genzvehicle.config.JwtService;
import com.kenny.genzvehicle.enums.Role;
import com.kenny.genzvehicle.model.Token;
import com.kenny.genzvehicle.model.User;
import com.kenny.genzvehicle.repo.TokenRepo;
import com.kenny.genzvehicle.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepo tokenRepo;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER) // Set default role to USER
                .build();
        userRepo.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(Role.USER) // Return the user's role
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));
        var user = userRepo.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole()) // Return the user's role
                .build();
    }

    private void saveUserToken(User user, String accessToken) {
        var token = Token.builder().user(user).token(accessToken).expired(false).revoked(false).build();
        tokenRepo.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepo.findAllByUser_IdAndExpiredFalseAndRevokedFalse(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepo.saveAll(validUserTokens);
    }

    public void logout(String username) {
        System.out.println("Logout Functionality Called");
        var user = userRepo.findByEmail(username).orElseThrow();
        revokeAllUserTokens(user);
    }
}
