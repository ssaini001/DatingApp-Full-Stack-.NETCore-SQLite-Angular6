import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = { }

  @Output() CancelRegister = new EventEmitter();

  constructor(private authservice:AuthService) { }

  ngOnInit() {
  }

  register(){
    this.authservice.register(this.model).subscribe(()=>{
      console.log('registeration successfull');
    }, error=>{
      console.log(error);
    });
    console.log(this.model);
  }

  cancel() {

    this.CancelRegister.emit(false);
    console.log('Cancelled');
  }

}
