import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-pending',
  imports: [TableModule],
  templateUrl: './pending.html',
  styleUrl: './pending.scss'
})
export class PendingComponent {
  todos: any[] = [];
}
