package com.nagp.task_planner.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundTodoException.class)
    public ResponseEntity<?> handleNotFound(NotFoundTodoException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "error", "NotFoundTodoException",
                "message", ex.getMessage()
        ));
    }

    @ExceptionHandler(InvalidTodoException.class)
    public ResponseEntity<?> handleInvalid(InvalidTodoException ex) {
        return ResponseEntity.badRequest().body(Map.of(
                "error", "InvalidTodoException",
                "message", ex.getMessage()
        ));
    }
}
