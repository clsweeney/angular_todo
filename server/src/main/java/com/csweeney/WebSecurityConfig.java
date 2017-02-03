package com.csweeney;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired	
	UserDetailsService userDetailsService;

	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {			 
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordencoder());;

	}	

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
    	.httpBasic()
    	  .and()
      .authorizeRequests()
      .antMatchers("/", "/*.js", "/*.css", "/console/**").permitAll()
        .anyRequest().authenticated().and()
        .csrf()
        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        .and()
      .authorizeRequests()
	    .antMatchers("/console/**").permitAll().and()
	      .csrf().disable()
	      .headers().frameOptions().disable()
	      .and()
      .formLogin()
        .loginPage("/")
        .permitAll()
        .and()
      .logout()
        .permitAll();;
  }
  
	@Bean(name="passwordEncoder")
    public PasswordEncoder passwordencoder(){
    	return new BCryptPasswordEncoder();
    }
}