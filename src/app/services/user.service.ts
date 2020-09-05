import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public readonly API_URL = environment.urlBase;

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(this.API_URL, JSON.stringify(user), {
      headers: {'Content-Type':'application/json; charset=utf-8'}
    });
  }

  readAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.API_URL);
  }

  getUser(userId:number, pass:string): Observable<User>{
    return this.http.get<User>(this.API_URL + '/' + userId, {
      headers: {'pass': pass}
    });
  }

  updateUser(user: User): Observable<User>{
    return this.http.put<User>(this.API_URL, JSON.stringify(user), {
      headers: {'Content-Type':'application/json; charset=utf-8'}
    });
  }

  deleteUser(userId:number): Observable<any>{
    return this.http.delete(this.API_URL + '/' + userId);
  }

  alterUserStatus(userId:number): Observable<any>{
    return this.http.get(this.API_URL + '/alter-status/' + userId);
  }
 
  checkPassword(userId:number, pass:string): Observable<any>{
    return this.http.get(this.API_URL + '/check-password/' + pass + '/user/' + userId);
  }
}
