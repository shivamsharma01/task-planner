import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../model/todo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = '/api/todos';

  private pendingTodosSubject = new BehaviorSubject<Todo[]>([]);
  private doneTodosSubject = new BehaviorSubject<Todo[]>([]);

  pendingTodos$ = this.pendingTodosSubject.asObservable();
  doneTodos$ = this.doneTodosSubject.asObservable();

  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      map((createdTodo) => {
        this.refreshTodos();
        return createdTodo;
      })
    );
  }

  refreshTodos() {
    this.getPendingTodos().subscribe();
    this.getDoneTodos().subscribe();
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      map(() => {
        this.refreshTodos();
      })
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo).pipe(
      map((updatedTodo) => {
        this.refreshTodos();
        return updatedTodo;
      })
    );
  }

  getPendingTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}?completed=false`).pipe(
      map(todos => {
        this.pendingTodosSubject.next(todos);
        return todos;
      })
    );
  }

  getDoneTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}?completed=true`).pipe(
      map(todos => {
        this.doneTodosSubject.next(todos);
        return todos;
      })
    );
  }

}