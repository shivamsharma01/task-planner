package com.nagp.task_planner.service;

import com.nagp.task_planner.dto.Todo;
import com.nagp.task_planner.exception.InvalidTodoException;

import java.util.List;

public interface TodoService {
    List<Todo> getAllTodos();
    List<Todo> getPendingTodos();
    List<Todo> getFinishedTodos();
    Todo addTodo(Todo todo) throws InvalidTodoException;
    boolean deleteTodo(long id);
    Boolean finishTodo(long id);
}
