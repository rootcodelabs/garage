package com.rootcodelabs.keycloakclient.service;

import com.rootcodelabs.keycloakclient.auth.AuthClient;
import com.rootcodelabs.keycloakclient.model.AuthInfo;
import com.rootcodelabs.keycloakclient.model.LoginInfo;
import com.rootcodelabs.keycloakclient.model.SignUpUserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import java.util.logging.Logger;

@Service
public class ClientServiceImpl implements ClientService {

    private static final Logger LOGGER = Logger.getLogger(ClientServiceImpl.class.getName());

    @Value("${keycloak.user.login.url}")
    private String userLoginUrl;

    @Value("${keycloak.admin.login.url}")
    private String adminLoginUrl;

    @Value("${keycloak.admin.client.id}")
    private String adminClientId;

    @Value("${keycloak.user.client.id}")
    private String userClientId;

    @Value("${keycloak.admin.username}")
    private String adminUser;

    @Value("${keycloak.admin.password}")
    private String adminPw;

    @Autowired
    private AuthClient authClient;

    @Override
    public ResponseEntity<AuthInfo> getKeyCloakKey(LoginInfo loginInfo) throws Exception {

      return authClient.getKeyCloakKey(loginInfo,userLoginUrl,userClientId);

    }

    @Override
    public ResponseEntity<String> createUser(SignUpUserInfo signUpUser) throws Exception {

        LoginInfo loginInfo = new LoginInfo();
        loginInfo.setUsername(adminUser);
        loginInfo.setPassword(adminPw);
        ResponseEntity<AuthInfo> adminAuthInfo = authClient.getKeyCloakKey(loginInfo,adminLoginUrl,adminClientId);
        return authClient.createUser(signUpUser,adminAuthInfo.getBody().getAccessToken());

    }

}
