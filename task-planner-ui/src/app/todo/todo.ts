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

@Component({
  selector: 'app-todo',
  imports: [FormsModule, FloatLabelModule, InputTextModule, InputGroupModule, InputGroupAddonModule, SelectModule, ButtonModule, IftaLabelModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss'
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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.selectedPriority = 'Low';
  }

  addTodo() {
    if (!this.title || !this.selectedPriority) {
      return;
    }
    const newTodo = {
      title: this.title,
      priority: this.selectedPriority.priority,
      description: this.description
    };

    this.http.post('/api/todos', newTodo).subscribe();

    this.reset();
  }

  reset() {
    this.title = '';
    this.selectedPriority = 'Low';
    this.description = '';
  }
}