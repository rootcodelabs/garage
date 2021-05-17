package com.rootcodelabs.keycloakclient.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

public class SignUpUserInfo {

    @JsonProperty("username")
    @NotNull(message ="Username required")
    private String username;

    @JsonProperty("enabled")
    @NotNull(message ="Enable required")
    private String enabled;

    @JsonProperty("email")
    @NotNull(message ="Email required")
    private String email;

    @JsonProperty("credentials")
    private ArrayList<CredentialInfo> credentials;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEnabled() {
        return enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ArrayList<CredentialInfo> getCredentials() {
        return credentials;
    }

    public void setCredentials(ArrayList<CredentialInfo> credentials) {
        this.credentials = credentials;
    }

    @Override
    public String toString() {
        return "{" +
                "username='" + username + '\'' +
                ", enabled='" + enabled + '\'' +
                ", email='" + email + '\'' +
                '}';
    }


}
