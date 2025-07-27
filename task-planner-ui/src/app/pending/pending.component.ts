import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TodoService } from '../../service/todo.service';
import { Todo } from '../../model/todo.model';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pending',
  imports: [TableModule, AsyncPipe],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.scss'
})
export class PendingComponent {
  todos!: Observable<Todo[]>;

  constructor(private todoService: TodoService) {
    this.todos = this.todoService.pendingTodos$.pipe(
      map(todos => todos || [])
    );
  }

  ngOnInit() {
    this.todoService.refreshPendingTodos();
  }

  removeTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        console.log(`Todo with id ${id} deleted successfully.`);
      },
      error: (error) => {
        console.error(`Error deleting todo with id ${id}:`, error);
      }
    });
  }

  finishTodo(id: number): void {
    this.todoService.finishTodo(id).subscribe({
      next: () => {
        console.log(`Todo with id ${id} finished successfully.`);
      },
      error: (error) => {
        console.error(`Error finishing todo with id ${id}:`, error);
      }
    });
  }

}
