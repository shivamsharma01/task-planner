package com.nagp.task_planner.service;

import com.nagp.task_planner.dto.Todo;
import com.nagp.task_planner.exception.InvalidTodoException;
import com.nagp.task_planner.exception.NotFoundTodoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface TodoService {
    List<Todo> getAllTodos();
    List<Todo> getPendingTodos();
    List<Todo> getFinishedTodos();
    Todo updateTodo(Todo todo) throws InvalidTodoException, NotFoundTodoException;
    Todo saveTodo(Todo todo) throws InvalidTodoException;
    boolean deleteTodo(long id);
}
