import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response';
import { HttpClient } from '@angular/common/http';
import { Vendor } from '../model/vendor.class';
@Injectable({
  providedIn: 'root'
})
export class VendorService {
  url: string = "http://localhost:8080/vendors/";
  constructor(private http: HttpClient) { }
  list(): Observable<JsonResponse>{
    return this.http.get(this.url) as Observable<JsonResponse>;
}
save(vendor: Vendor ): Observable<JsonResponse>{
  return this.http.post(this.url, vendor) as Observable<JsonResponse>;
}
get(id: number): Observable<JsonResponse>{
  return this.http.get(this.url+id) as Observable<JsonResponse>;
}
delete(id: number): Observable<JsonResponse>{
return this.http.delete(this.url+id) as Observable<JsonResponse>;
}
}
