import { Component } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    LoginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;


  constructor(private fb: NonNullableFormBuilder,
              private authService: AuthService,
              private message: NzMessageService,
              private router: Router
            ){
              this.LoginForm = this.fb.group({
              email: ['', [Validators.email, Validators.required]],
              password: ['', Validators.required],
  });
}


}
