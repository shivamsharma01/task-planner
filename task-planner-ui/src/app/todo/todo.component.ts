import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { Todo } from '../../model/todo.model';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, FloatLabelModule, InputTextModule, InputGroupModule, InputGroupAddonModule, SelectModule, ButtonModule, IftaLabelModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  title: string = '';
  selectedPriority: any = null;
  description: string = '';
  priorityOptions = [
    { priority: 'High' },
    { priority: 'Medium' },
    { priority: 'Low' }
  ];

  constructor(private http: HttpClient, private todoService: TodoService) { }

  ngOnInit() {
    this.selectedPriority = 'Low';
  }

  addTodo() {
    if (!this.title) {
      return;
    }
    const newTodo: Todo = {
      title: this.title,
      priority: this.selectedPriority,
      description: this.description
    };
    this.todoService.addTodo(newTodo).subscribe(
      {
        next: (todo) => {
          console.log('Todo added:', todo);
          this.reset();
        },
        error: (error) => {
          console.error('Error adding todo:', error);
        }
      }
    );
  }

  reset() {
    this.title = '';
    this.selectedPriority = 'Low';
    this.description = '';
  }
}