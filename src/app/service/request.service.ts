import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JsonResponse } from '../model/json-response';
import {Request } from '../model/request.class';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string ="http://localhost:8080/requests/";
  constructor(private http: HttpClient) { }
list(): Observable<JsonResponse>{
    return this.http.get(this.url) as Observable<JsonResponse>;
  }
get(id: number): Observable<JsonResponse>{
    return this.http.get(this.url+id) as Observable<JsonResponse>;
  }
save(request: Request): Observable<JsonResponse>{
    return this.http.post(this.url, request) as Observable<JsonResponse>;
}

delete(id: number): Observable<JsonResponse>{
  return this.http.delete(this.url+id) as Observable<JsonResponse>;
}
submitForReview(request: Request): Observable<JsonResponse>{
  return this.http.put(this.url+"submit-review", request) as Observable<JsonResponse>
}
approve(request: Request): Observable<JsonResponse>{
  return this.http.put(this.url+"approve", request)as Observable<JsonResponse>;
}
reject(request: Request): Observable<JsonResponse>{
  return this.http.put(this.url+"reject", request)as Observable<JsonResponse>;
}
requestForReview(id: number): Observable<JsonResponse>{
  return this.http.get(this.url+ "list-review/" + id)as Observable<JsonResponse>;
}

}

