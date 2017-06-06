package kr.or.connect.todo.persistence;


import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoService {
	private TodoDao dao;

	public TodoService(TodoDao dao) {
		this.dao = dao;
	}

	public List<Todo> findAll() {
		return dao.selectAll();
	}
}
