import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

// We dont need to use if use @auth0/angular-jwt's http interceptor to send token automatically to server
// the method JwtModule.forRoot in app.module.ts configure this same option to to access server with the jwt token
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users');
}

getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(id:number, user : User) {

  return this.http.put(this.baseUrl + 'users/' +id, user);

}

setMainPhoto(userId: number , id: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain',{});
}

deletePhoto(userId : number, id:number){
    return this.http.delete(this.baseUrl+'users/'+userId+'/photos/'+id);
}

}
