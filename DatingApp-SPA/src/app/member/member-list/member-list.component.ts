import { PaginatedResult } from './../../_models/pagination';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  user :User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display:'Males'}, {value:'female',display:'Females'}];
  pagination: Pagination;
  userPagingParams : any ={};
  page: number;

  constructor(private userService : UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userPagingParams.gender = this.user.gender ==='female' ? 'male' : 'female';
    this.userPagingParams.minAge = 18;
    this.userPagingParams.maxAge = 99;
    this.userPagingParams.orderBy = "lastActive";
  }

  resetFilters(){
    this.userPagingParams.gender = this.user.gender ==='female' ? 'male' : 'female';
    this.userPagingParams.minAge = 18;
    this.userPagingParams.maxAge = 99;
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userPagingParams).subscribe((res:PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

}
