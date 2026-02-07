package org.example.firstdemo.controller;

import org.example.firstdemo.model.HelloResponse;
import org.example.firstdemo.service.HelloService;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Scope("request")
@CrossOrigin(origins = "http://localhost:4200")
public class HelloController {

    private final HelloService helloService;

    public HelloController(HelloService helloService) {
        this.helloService = helloService;
    }

    @GetMapping("/hello")
    public HelloResponse hello() {
        return helloService.getHello();
    }
}

