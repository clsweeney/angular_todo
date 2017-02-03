package com.csweeney;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.stereotype.Service;

import com.csweeney.model.CustomUser;

/**
 * Reference org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl
 *
 * @author mkyong
 *
 */
@Service("userDetailsService")
public class CustomUserDetailsService extends JdbcDaoImpl {

	@Autowired
	private DataSource dataSource;

	@PostConstruct
	private void initialize() {
		setDataSource(dataSource);
	}

	@Override
	@Value("select * from users where username = ?")
	public void setUsersByUsernameQuery(String usersByUsernameQueryString) {
		super.setUsersByUsernameQuery(usersByUsernameQueryString);
	}

	@Override
	@Value("select b.username, a.role from user_roles a, users b where b.username=? and a.userid=b.userid")
	public void setAuthoritiesByUsernameQuery(String queryString) {
		super.setAuthoritiesByUsernameQuery(queryString);
	}

	//override to get accountNonLocked
	@Override
	public List<UserDetails> loadUsersByUsername(String username) {
	  return getJdbcTemplate().query(super.getUsersByUsernameQuery(), new String[] { username },
		new RowMapper<UserDetails>() {
		  public CustomUser mapRow(ResultSet rs, int rowNum) throws SQLException {
			long userId = rs.getLong("userid");
			String username = rs.getString("username");
			String password = rs.getString("password");
			boolean enabled = rs.getBoolean("enabled");

			return new CustomUser(userId, username, password, enabled, AuthorityUtils.NO_AUTHORITIES);
		  }

	  });
	}

	//override to pass accountNonLocked
	@Override
	public UserDetails createUserDetails(String username, UserDetails userFromUserQuery,
			List<GrantedAuthority> combinedAuthorities) {
		

		return new CustomUser(((CustomUser)userFromUserQuery).getUserId(), userFromUserQuery.getUsername(), userFromUserQuery.getPassword(),
                       userFromUserQuery.isEnabled(),
		       combinedAuthorities);
	}

}
