import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Request} from '../../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  reqUrl = 'http://localhost:3000/request';
  constructor(private http: HttpClient) {
   }
   submitRequest(req: Request) {
     return this.http.post(this.reqUrl, req);
   }
}
