package com.rootcodelabs.keycloakclient.auth;

import com.google.gson.Gson;
import com.rootcodelabs.keycloakclient.model.AuthInfo;
import com.rootcodelabs.keycloakclient.model.LoginInfo;
import com.rootcodelabs.keycloakclient.model.SignUpUserInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.net.URI;
import java.util.logging.Logger;

@Component
public class AuthClientImpl implements  AuthClient{

    private static final Logger LOGGER = Logger.getLogger(AuthClientImpl.class.getName());

    @Value("${keycloak.create.user.url}")
    private String createUserUrl;

    @Override
    public ResponseEntity<AuthInfo> getKeyCloakKey(LoginInfo loginInfo, String userLoginUrl, String client) throws Exception {

        RestTemplate restTemplate = new RestTemplate();
        URI url = new URI(userLoginUrl);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
        map.add("client_id", client);
        map.add("username", loginInfo.getUsername());
        map.add("password", loginInfo.getPassword());
        map.add("grant_type", "password");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);

        ResponseEntity<AuthInfo> response = restTemplate.postForEntity( url, request , AuthInfo.class );
        AuthInfo authInfoObject = response.getBody();

        LOGGER.info("----code---"+response.getStatusCode());
        LOGGER.info("----authInfo---"+authInfoObject.getAccessToken());

        return response;
    }

    @Override
    public ResponseEntity<String> createUser(SignUpUserInfo signUpUser, String accessToken) throws Exception {

        RestTemplate restTemplate = new RestTemplate();
        SignUpUserInfo signUpUserInfo = signUpUser;

        HttpHeaders headers = new HttpHeaders();
        LOGGER.info("----post response--accessToken-"+accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer "+accessToken);

        HttpEntity<String> request = new HttpEntity<>(new Gson().toJson(signUpUserInfo), headers);

        ResponseEntity<String> response = restTemplate.postForEntity(createUserUrl,  request, String.class);
        LOGGER.info("----post response---"+response.toString());
        return response;
    }
}
