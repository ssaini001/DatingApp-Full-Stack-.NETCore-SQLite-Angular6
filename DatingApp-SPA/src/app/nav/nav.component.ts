import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string;
  constructor(public authService:AuthService, private alertify:AlertifyService, private router : Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(url => {
      this.photoUrl = url;
    });
  }

  login(){
    this.authService.login(this.model)
        .subscribe(next => {
          this.alertify.success('Logged In Successfully');

        }, error => {
          this.alertify.error(error);
        },()=>{
          this.router.navigate(['/members']);
        });
  }

  loggedIn(){
    // const token = localStorage.getItem('token');
    // return !!token;     //shortcut for if else
     return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser= null;

    this.alertify.message('logged out');
    this.router.navigate(['/home']);
    
  }

  

}
