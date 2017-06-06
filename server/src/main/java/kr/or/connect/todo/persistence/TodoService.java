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
	
	public Todo add(Todo todo) {
		todo.setId(dao.add(todo));
		return todo;
	}

 	public int updateCompleted(Integer id, Integer completed) {
 		return dao.update(id, completed);
 	}

	public int deleteById(Integer id) {
		return dao.deleteById(id);
 	}
	
	public int deleteByCompleted() {
		return dao.deleteByCompleted();
 	}
}
