package org.example.firstdemo.model;

public class HelloResponse {

    private String message;
    private int year;

    public HelloResponse(String message, int year) {
        this.message = message;
        this.year = year;
    }

    public String getMessage() {
        return message;
    }

    public int getYear() {
        return year;
    }
}