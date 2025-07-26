import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-pending',
  imports: [TableModule],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.scss'
})
export class PendingComponent {
  todos: any[] = [];

  constructor(private todoService: TodoService) {
    this.loadPendingTodos();
  }

  loadPendingTodos() {
    this.todoService.pendingTodos$.subscribe(todos => {
      this.todos = todos;
    });
  }
}
