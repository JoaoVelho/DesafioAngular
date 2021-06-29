import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class PurchasesService {
    constructor(private http: HttpClient) {}

    protected urlServiceV1: string = 'http://localhost:5000/api/v1/';

    getPurchases(): Observable<any[]> {
        return this.http.get<any[]>(
            this.urlServiceV1 + 'purchases/', 
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }

    createPurchase(body: any): Observable<any> {
        return this.http.post<any>(
            this.urlServiceV1 + 'purchases/', 
            body,
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }
}