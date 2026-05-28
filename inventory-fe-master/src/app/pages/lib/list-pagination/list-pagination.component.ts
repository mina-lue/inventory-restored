import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-list-pagination',
  standalone: true,
  imports: [CommonModule, NzPaginationModule],
  templateUrl: './list-pagination.component.html',
  styleUrl: './list-pagination.component.scss'
})
export class ListPaginationComponent {
  @Input() total = 0;
  @Input() pageIndex = 1;
  @Input() pageSize = 20;
  @Input() pageSizeOptions = [5, 10, 15, 20, 30, 40, 50];
  @Input() showSizeChanger = true;

  @Output() pageIndexChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
}
