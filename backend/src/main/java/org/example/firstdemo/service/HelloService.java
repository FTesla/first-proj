package org.example.firstdemo.service;

import org.example.firstdemo.model.HelloResponse;
import org.springframework.stereotype.Service;

import java.time.Year;

@Service
public class HelloService {

    public HelloResponse getHello() {
        return new HelloResponse(
                "Hello, world",
                Year.now().getValue()
        );
    }
}
