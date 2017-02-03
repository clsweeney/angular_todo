package com.csweeney.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ToDo {

    private final long id;
    private final String value;
    private final long createdBy;

    public ToDo(@JsonProperty("id")long id, @JsonProperty("value")String value, @JsonProperty("createdBy")long createdBy) {
        this.id = id;
        this.value = value;
        this.createdBy = createdBy;
    }

    public long getId() {
        return id;
    }

    public String getValue() {
        return value;
    }
    
    public long getCreatedBy() {
        return createdBy;
    }
    
    @Override
    public String toString() {
    	return this.id + ":" + this.value + ":" + this.createdBy;
    }
}
