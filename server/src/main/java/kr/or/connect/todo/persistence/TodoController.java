package kr.or.connect.todo.persistence;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
	private final TodoService todoService;
	private final Logger log = LoggerFactory.getLogger(TodoController.class);

	@Autowired
	public TodoController(TodoService service) {
		this.todoService = service;
	}
	
	@GetMapping
	List<Todo> readList() {
		return todoService.findAll();
	}
}
