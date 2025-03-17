package com.project.accountbook.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {
    @GetMapping("/user/login")
    public String login() {
        return "login";
    }

    @GetMapping("/user/join")
    public String join() {
        return "join";
    }
}
