import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelloResponse } from '../models/hello-response';

@Injectable({
  providedIn: 'root'
})
export class HelloService {

  private readonly apiUrl = 'http://localhost:8080/hello';

  constructor(private http: HttpClient) {}

  getHello(): Observable<HelloResponse> {
    return this.http.get<HelloResponse>(this.apiUrl);
  }
}
