import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = { }

  @Output() CancelRegister = new EventEmitter();

  constructor(private authservice:AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register(){
    this.authservice.register(this.model).subscribe(()=>{
      this.alertify.success('registeration successfull');
    }, error=>{
      this.alertify.error(error);
    });

  }

  cancel() {

    this.CancelRegister.emit(false);

  }

}
