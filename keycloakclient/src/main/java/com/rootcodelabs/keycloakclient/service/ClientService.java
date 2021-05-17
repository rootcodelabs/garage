package com.rootcodelabs.keycloakclient.service;

import com.rootcodelabs.keycloakclient.model.AuthInfo;
import com.rootcodelabs.keycloakclient.model.SignUpUserInfo;
import com.rootcodelabs.keycloakclient.model.LoginInfo;
import org.springframework.http.ResponseEntity;

public interface ClientService {
    public ResponseEntity<AuthInfo> getKeyCloakKey(LoginInfo loginInfo) throws Exception;
    public ResponseEntity<String> createUser(SignUpUserInfo signUpUser) throws Exception;
}
