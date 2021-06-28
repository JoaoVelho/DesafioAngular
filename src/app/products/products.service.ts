import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ProductsService {
    constructor(private http: HttpClient) {}

    protected urlServiceV1: string = 'http://localhost:5000/api/v1/';

    getProducts(): Observable<any[]> {
        return this.http.get<any[]>(
            this.urlServiceV1 + 'products/', 
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }
}