package com.rootcodelabs.keycloakclient.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CredentialInfo {

    @JsonProperty("value")
    private String value;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
