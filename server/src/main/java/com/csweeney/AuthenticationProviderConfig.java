package com.csweeney;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;

@Configuration
public class AuthenticationProviderConfig {
	
	@Bean(name = "dataSource")
	public DriverManagerDataSource dataSource() {
	    DriverManagerDataSource driverManagerDataSource = new DriverManagerDataSource();
	    driverManagerDataSource.setDriverClassName("org.h2.Driver");
	    driverManagerDataSource.setUrl("jdbc:h2:file:./tododb");
	    driverManagerDataSource.setUsername("sa");
	    //driverManagerDataSource.setPassword("root");
	    return driverManagerDataSource;
	}
    
    @Bean(name="userDetailsService")
    public UserDetailsService userDetailsService(){
    	CustomUserDetailsService cds = new CustomUserDetailsService();
    	//JdbcDaoImpl jdbcImpl = new JdbcDaoImpl();
    	cds.setDataSource(dataSource());
    	//jdbcImpl.setUsersByUsernameQuery("select username,password, enabled from users where username=?");
    	//jdbcImpl.setAuthoritiesByUsernameQuery("select b.username, a.role from user_roles a, users b where b.username=? and a.userid=b.userid");
    	return cds;
    }
}
