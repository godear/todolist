package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String DELETE_BY_ID =
			"DELETE FROM todo WHERE id= :id";
	static final String SELECT_ALL = 
			"SELECT * FROM todo ORDER BY ID ASC";
	static final String UPDATE_COMPLETED =
			"UPDATE todo SET completed = :completed WHERE id = :id";
}
