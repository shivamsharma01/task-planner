import { Component } from '@angular/core';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-done',
  imports: [],
  templateUrl: './done.component.html',
  styleUrl: './done.component.scss'
})
export class DoneComponent {
  todos: any[] = [];

  constructor(private todoService: TodoService) {
    this.loadDoneTodos();
  }

  loadDoneTodos() {
    this.todoService.doneTodos$.subscribe(todos => {
      this.todos = todos;
    });
  }
}
