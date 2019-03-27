import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user : User;
  registerForm: FormGroup;
  bsConfig : Partial< BsDatepickerConfig>;


  @Output() CancelRegister = new EventEmitter();

  constructor(private authservice:AuthService, private alertify: AlertifyService , private fb: FormBuilder, private router : Router) { }

  ngOnInit() {

    this.bsConfig = {
      containerClass: 'theme-red'
    };

      this.registerForm = this.fb.group({
        gender : ['male'],
        username: ['', Validators.required],
        knownAs : ['', Validators.required],
        dateOfBirth : ['', Validators.required],
        city : ['', Validators.required],
        country : ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmPassword : ['', Validators.required ]
      }, {validator : this.passwordMatchValidator});

    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch : true};
  }

  register(){
    if(this.registerForm.valid){
        this.user = Object.assign({}, this.registerForm.value);
        this.authservice.register(this.user).subscribe(() => {
            this.alertify.success('registeration successfull');
          }, error => {
            this.alertify.error(error);
          }, () => {
            this.authservice.login(this.user).subscribe(()=> {
                this.router.navigate(['/members']);
            });
          });
    }
    // this.authservice.register(this.model).subscribe(()=>{
    //   this.alertify.success('registeration successfull');
    // }, error=>{
    //   this.alertify.error(error);
    // });

    console.log(this.registerForm.value);

  }

  cancel() {

    this.CancelRegister.emit(false);

  }

}
