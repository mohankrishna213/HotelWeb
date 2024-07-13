import { Component } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../services/auth/auth.service';
import { error } from 'console';
import { UserStorageService } from '../../services/storage/user-storage.service';

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
submitForm(){
  this.authService.login(this.LoginForm.value).subscribe(res=>{
   console.log(res);
   if(res.userId!=null){
    const user = {
      id: res.userId,
      role: res.userRole
    }

    UserStorageService.saveUser(user);
    UserStorageService.saveToken(res.jwt);

    if(UserStorageService.isAdminLoggedIn()){
      this.router.navigateByUrl('/admin/dashboard');
    }else if(UserStorageService.isCustomerLoggedIn()){
      this.router.navigateByUrl('/customer/rooms');
    }
   }
  },error=>
    this.message
    .error(
      `bad credentials`,
      { nzDuration: 5000}
    )
)}

}
