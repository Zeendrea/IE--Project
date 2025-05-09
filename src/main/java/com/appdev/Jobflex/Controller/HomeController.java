package com.appdev.Jobflex.Controller;

import org.springframework.web.bind.annotation.GetMapping;
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "API is running!";
    }
}