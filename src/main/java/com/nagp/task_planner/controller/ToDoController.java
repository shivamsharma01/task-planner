package com.nagp.task_planner.controller;

import com.nagp.task_planner.dto.Todo;
import com.nagp.task_planner.exception.InvalidTodoException;
import com.nagp.task_planner.exception.NotFoundTodoException;
import com.nagp.task_planner.service.TodoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/todos")
public class ToDoController {
    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<List<Todo>> getTodos(@RequestParam(required = false) Boolean completed) {
        if (completed != null && !completed) {
            return ResponseEntity.ok(todoService.getPendingTodos());
        } else if (completed != null) {
            return ResponseEntity.ok(todoService.getFinishedTodos());
        } else {
            return ResponseEntity.ok(todoService.getAllTodos());
        }
    }

    @PostMapping("/todo/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable long id, @Valid @RequestBody Todo todo) throws InvalidTodoException, NotFoundTodoException {
        todo.setId(id);
        return ResponseEntity.ok(todoService.updateTodo(todo));
    }

    @PutMapping("/todo")
    public ResponseEntity<Todo> saveTodo(@Valid @RequestBody Todo todo) throws InvalidTodoException {
        return ResponseEntity.ok(todoService.saveTodo(todo));
    }

    @DeleteMapping("/todo/{id}")
    public ResponseEntity<Boolean> deleteTodo(@PathVariable long id) {
        return ResponseEntity.ok(todoService.deleteTodo(id));
    }
}
