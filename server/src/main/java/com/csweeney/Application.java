package com.csweeney;

import java.security.Principal;

import org.h2.server.web.WebServlet;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.provisioning.InMemoryUserDetailsManagerConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Application {
	
	  @RequestMapping("/user")
	  public Principal user(Principal user) {
	    return user;
	  }
	  
	  @Configuration
	  public class WebConfiguration {
	      @Bean
	      ServletRegistrationBean h2servletRegistration(){
	          ServletRegistrationBean registrationBean = new ServletRegistrationBean( new WebServlet());
	          registrationBean.addUrlMappings("/console/*");
	          return registrationBean;
	      }
	  }

    public static void main(String[] args) {
    	
//    	String cryptedPassword = new BCryptPasswordEncoder().encode("password");
//    	System.out.println("~~~~~~~~~~~~~~~~~~~~~|"+cryptedPassword+"|~~~~~~~~~~~~~~~~~~");
    	
        SpringApplication.run(Application.class, args);
    }
}
