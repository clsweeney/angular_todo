package com.csweeney.rest_api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.dao.DataAccessException;

import com.csweeney.model.CustomUser;
import com.csweeney.model.ToDo;

@RestController
public class ToDoController {
	
	@Autowired
    JdbcTemplate jdbcTemplate;

    @RequestMapping(value = "/todos", method = RequestMethod.GET)
    public ToDo[] todos() {
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	CustomUser user = (CustomUser) auth.getPrincipal();
    	List<ToDo> data = jdbcTemplate.query(
                "SELECT id, value, createdBy FROM todos WHERE createdBy = ?", new Object[] { user.getUserId() },
                (rs, rowNum) -> new ToDo(rs.getLong("id"), rs.getString("value"), rs.getLong("createdBy"))
        );
    	
        return data.toArray(new ToDo[data.size()]);
    }
    
    @RequestMapping(value = "/todo/{id}", method = RequestMethod.PUT)
    public void updateTodo(@PathVariable("id") long id, @RequestBody ToDo todo) {
    	jdbcTemplate.update("UPDATE todos set value = ? WHERE id = ?", new Object[] { todo.getValue(), todo.getId() });
    }
    
    @RequestMapping(value = "/todo/{id}", method = RequestMethod.DELETE)
    public ToDo[] deleteTodo(@PathVariable("id") long id) {
    	jdbcTemplate.update("DELETE FROM todos WHERE id = ?", new Object[] { id });
    	
    	return this.todos();
    }
    
    @RequestMapping(value = "/todo/", method = RequestMethod.POST)
    public ToDo[] createTodo(@RequestBody String  todoValue) {
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	CustomUser user = (CustomUser) auth.getPrincipal();
    	jdbcTemplate.update("INSERT INTO todos (value, createdBy) values( ?, ? )", new Object[] { todoValue, user.getUserId() });
    	
    	return this.todos();
    }
}
