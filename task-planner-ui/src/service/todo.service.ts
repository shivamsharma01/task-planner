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

  constructor(private http: HttpClient) { }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/todo`, todo).pipe(
      map((createdTodo) => {
        this.refreshTodos();
        return createdTodo;
      })
    );
  }

  refreshTodos() {
    console.log('Refreshing todos...');
    this.refreshPendingTodos();
    this.refreshFinishedTodos();
  }

  refreshPendingTodos() {
    console.log('Refreshing pending todos...');
    this.getPendingTodos().subscribe();
  }

  refreshFinishedTodos() {
    console.log('Refreshing Finished todos...');
    this.getDoneTodos().subscribe();
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/todo/${id}`).pipe(
      map(() => {
        this.refreshTodos();
      })
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/todo/${todo.id}`, todo).pipe(
      map((updatedTodo) => {
        this.refreshTodos();
        return updatedTodo;
      })
    );
  }

  getPendingTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}?completed=false`).pipe(
      map(todos => {
        console.log('Getting pending todos...');
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