import { Component } from '@angular/core';
import { TodoComponent } from "./todo/todo";
import { DoneComponent } from "./done/done";
import { HeaderComponent } from "./header/header";
import { PendingComponent } from './pending/pending';

@Component({
  selector: 'app-root',
  imports: [TodoComponent, DoneComponent, PendingComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
