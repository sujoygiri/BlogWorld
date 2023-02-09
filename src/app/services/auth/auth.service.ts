import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {RegistrationDataModel} from "../../models/user/registration-data.model";
import {LoginDataModel} from "../../models/user/login-data.model";
import {ResponseDataModel} from "../../models/response-data.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  onRegisterHandler(userData: RegistrationDataModel): Observable<ResponseDataModel> {
    let URL = 'http://127.0.0.1:8080/users/register'
    return this.http.post<ResponseDataModel>(URL, userData, {withCredentials: true})
  }

  onLoginHandler(userData:LoginDataModel):Observable<ResponseDataModel>{
    let URL = 'http://127.0.0.1:8080/users/login'
    return this.http.post<ResponseDataModel>(URL,userData,{withCredentials:true})
  }

  onVerify():Observable<any>{
    let URL = 'http://127.0.0.1:8080/users/verify'
    return this.http.get(URL,{withCredentials:true})
  }
}
