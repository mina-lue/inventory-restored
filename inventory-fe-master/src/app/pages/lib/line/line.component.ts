import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-line',
  imports: [CommonModule],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent {
@Input() name!: string;
@Input() value!: any;
}
