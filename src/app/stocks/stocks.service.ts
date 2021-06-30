import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class StocksService {
    constructor(private http: HttpClient) {}

    protected urlServiceV1: string = 'http://localhost:5000/api/v1/';

    getStocks(): Observable<any[]> {
        return this.http.get<any[]>(
            this.urlServiceV1 + 'stocks/', 
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }

    getStockById(id: string): Observable<any> {
        return this.http.get<any>(
            this.urlServiceV1 + 'stocks/' + id, 
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }

    editStock(id: number, body: any): Observable<any> {
        return this.http.put<any>(
            this.urlServiceV1 + 'stocks/' + id, 
            body,
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }

    getStockByProductId(productId: string): Observable<any> {
        return this.http.get<any>(
            this.urlServiceV1 + 'stocks/product/' + productId, 
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }
}