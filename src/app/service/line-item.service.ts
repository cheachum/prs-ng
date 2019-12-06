import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response';
import { LineItem } from '../model/line-item.class';
import { SystemService } from './system.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LineItemService {
url: string = "http://localhost:8080/line-items/";


constructor(    
  protected sysSvc: SystemService,
  private http: HttpClient
) {}

list(): Observable<JsonResponse> {
  return this.http.get(this.url ) as Observable<JsonResponse>;
}
get(id): Observable<JsonResponse> {
  return this.http.get(this.url+ id) as Observable<JsonResponse>;
}
save(lineitem: LineItem): Observable<JsonResponse> {
  return this.http.post(this.url, lineitem) as Observable<JsonResponse>;
}
change(lineitem: LineItem): Observable<JsonResponse>{
  return this.http.put(this.url, lineitem) as Observable<JsonResponse>;
}

lineForReq(id): Observable<JsonResponse> {
  return this.http.get(this.url + "lines-for-pr/"+ id) as Observable<JsonResponse>;
}
delete(id: number): Observable<JsonResponse>{
  return this.http.delete(this.url+id) as Observable<JsonResponse>;
}

remove(lineitem: LineItem): Observable<JsonResponse>{
  return this.http.put(this.url, lineitem) as Observable<JsonResponse>;
}

}