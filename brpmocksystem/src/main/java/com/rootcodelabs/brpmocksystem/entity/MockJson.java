package com.rootcodelabs.brpmocksystem.entity;

import javax.persistence.*;

/**
 * Entity class for mock json entity.
 */
@Entity
@Table(name="MOCK_JSON")
public class MockJson {
    @Id
    @Column(name = "ID")
    String id;

    @Lob
    @Column(name = "PAYLOAD", columnDefinition="BLOB")
    private String payload;

    public MockJson() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }
}
