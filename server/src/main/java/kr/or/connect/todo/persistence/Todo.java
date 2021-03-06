package kr.or.connect.todo.persistence;

public class Todo {
	private Integer id;
	private String todo;
	private Integer completed;
	
	public Todo(){
		
	}
	
	public Todo(String todo, Integer completed) {
		this.todo = todo;
		this.completed = completed;
	}
	
	public Todo(Integer id, String todo, Integer completed) {
		super();
		this.id = id;
		this.todo = todo;
		this.completed = completed;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTodo() {
		return todo;
	}
	public void setTodo(String todo) {
		this.todo = todo;
	}
	public Integer getCompleted() {
		return completed;
	}
	public void setCompleted(Integer completed) {
		this.completed = completed;
	}
}
