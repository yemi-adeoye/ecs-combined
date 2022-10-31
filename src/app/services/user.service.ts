import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Login } from '../models/login.model';
import { UserInfo } from '../models/user.model';
import {environment} from '../../environments/environment';
import { Manager } from '../models/manager.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  msg$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  public login(login: Login):Observable<string>{
    const token = window.btoa(login.email + ':'+ login.password);
    const header = {'Authorization': 'Basic ' + token}
    return this.http.get<string>(environment.serverUrl + '/auth/login',{headers: header} );
  }

  public getUser(token: string) : Observable<UserInfo>{
    const header = {'Authorization': 'Basic ' + token}
      return this.http.get<UserInfo>(environment.serverUrl + '/auth/user',{headers: header});
  }

  public signUp(employee: Employee) :Observable<any>{
    return this.http.post<any>(environment.serverUrl + '/employee/add', employee);
  }

  public getAllManagers():Observable<Manager[]> {
    return this.http.get<Manager[]>(environment.serverUrl +'/manager/all');
  }

  public sendPasswordResetLink(email: string): Observable<any>{
    return this.http.post<any>(environment.serverUrl + '/auth/forgot-password', email);
  }

  public sendPassword(password: object): Observable<any>{
    return this.http.post<any>(environment.serverUrl + '/auth/reset-password', password);
  }


}
