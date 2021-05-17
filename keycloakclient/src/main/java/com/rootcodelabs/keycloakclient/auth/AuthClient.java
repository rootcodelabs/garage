package com.rootcodelabs.keycloakclient.auth;

import com.rootcodelabs.keycloakclient.model.AuthInfo;
import com.rootcodelabs.keycloakclient.model.SignUpUserInfo;
import com.rootcodelabs.keycloakclient.model.LoginInfo;
import org.springframework.http.ResponseEntity;

public interface AuthClient {
    public ResponseEntity<AuthInfo> getKeyCloakKey(LoginInfo loginInfo, String url, String client) throws Exception;
    public ResponseEntity<String> createUser(SignUpUserInfo signUpUser,String accessToken) throws Exception;
}
