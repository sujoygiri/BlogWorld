import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isAuthencicated:boolean = false
  constructor(private http: HttpClient) { }

  onSubmitEditorJsData(data:any):Observable<any>{
    const URL = 'http://127.0.0.1:8080/api/blogs/get-editor-raw-data';
    return this.http.post(URL, data)
  }

}
