import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-welcome',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzIconModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  welcomeForm: any;

constructor(private readonly fb: FormBuilder){
this.welcomeForm = fb.group({
  name: [undefined, Validators.required],
  balance: [undefined, Validators.required],
  capital: [undefined, Validators.required]
})

}
  save(data:any){
    console.log(data )
  }
}
