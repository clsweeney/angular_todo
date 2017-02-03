package com.csweeney.model;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

public class CustomUser extends User {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final long userId;

    public CustomUser(long userId, String username, String password, Boolean enabled, List<GrantedAuthority> authorities) {
    	super(username, password, enabled, true, true, true, authorities);
        this.userId = userId;
    }
    
    public long getUserId() {
        return userId;
    }
}