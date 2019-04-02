import { User } from 'src/app/_models/user';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()

export class ListsResolver implements Resolve<User> {
    constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) {}

        pageNumber = 1;
        pageSize = 5;
        likesParam = 'Likers';
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam ).pipe(
            catchError(error => {
                this.alertify.error('Problem Retreieving the data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}