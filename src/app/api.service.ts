import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpClient = inject(HttpClient);

  constructor() {}

  invokeApi() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
    });
    return this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1', {
      headers,
    });
  }
}
