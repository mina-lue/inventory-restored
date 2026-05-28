import { Component,  } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-attendance',
  imports: [NzTabsModule, RouterOutlet,RouterLink, NzIconModule, NzMenuModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent  {



}
