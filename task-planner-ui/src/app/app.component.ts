import { AfterViewInit, Component } from '@angular/core';
import { TodoComponent } from "./todo/todo.component";
import { DoneComponent } from "./done/done.component";
import { HeaderComponent } from "./header/header.component";
import { PendingComponent } from './pending/pending.component';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-root',
  imports: [TodoComponent, DoneComponent, PendingComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  title = 'Task Planner';

}
