import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class SellingsService {
    constructor(private http: HttpClient) {}

    protected urlServiceV1: string = 'http://localhost:5000/api/v1/';

    getSellings(): Observable<any[]> {
        return this.http.get<any[]>(
            this.urlServiceV1 + 'sellings/', 
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }

    createSelling(body: any): Observable<any> {
        return this.http.post<any>(
            this.urlServiceV1 + 'sellings/', 
            body,
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }

    confirmSelling(id: string): Observable<any> {
        return this.http.put<any>(
            this.urlServiceV1 + 'sellings/' + id + '/confirmation',
            {},
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }
}