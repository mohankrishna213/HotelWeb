import { Component } from '@angular/core';
import { AbstractControl,FormControl, FormBuilder, FormGroup, ValidatorFn, Validators, NonNullableFormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup<{
    email: FormControl<string>;
    name: FormControl<string>;
    designation: FormControl<string>;
    password: FormControl<string>;
    confirmpassword: FormControl<string>;
  }>;


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.registerForm.controls.confirmpassword.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: NonNullableFormBuilder,
              private authService: AuthService,
              private message: NzMessageService,
              private router: Router
            ){
              this.registerForm = this.fb.group({
              email: ['', [Validators.email, Validators.required]],
              password: ['', Validators.required],
              confirmpassword: ['', [Validators.required, this.confirmationValidator]],
              name: ['',Validators.required],
              designation:['']  
  });
}

submitForm() {
  this.authService.register(this.registerForm.value).subscribe(res=>{
    if(res.id !=null){
      this.message.success("signup successful", {nzDuration: 5000});
      this.router.navigateByUrl("/");
    }else{
      this.message.error(`${res.message}`,{nzDuration:5000})
    }
  })
}


}
