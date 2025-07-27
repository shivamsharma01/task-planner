import { Component } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { map, Observable } from 'rxjs';
import { Todo } from '../../model/todo.model';
import { TableModule } from 'primeng/table';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-done',
  imports: [TableModule, AsyncPipe],
  templateUrl: './done.component.html',
  styleUrl: './done.component.scss'
})
export class DoneComponent {
  todos!: Observable<Todo[]>;
  
    constructor(private todoService: TodoService) {
      this.todos = this.todoService.doneTodos$.pipe(
        map(todos => todos || [])
      );
    }
  
    ngOnInit() {
      this.todoService.refreshFinishedTodos();
    }
  
  }
  