package com.kenny.genzvehicle.auth;

import com.kenny.genzvehicle.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String name;
    private String email;
    private String password;

    @Builder.Default
    private Role role = Role.USER;
}
