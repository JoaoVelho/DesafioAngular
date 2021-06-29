import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class SuppliersService {
    constructor(private http: HttpClient) {}

    protected urlServiceV1: string = 'http://localhost:5000/api/v1/';

    getSuppliers(): Observable<any[]> {
        return this.http.get<any[]>(
            this.urlServiceV1 + 'suppliers/', 
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }

    getSupplierById(id: string): Observable<any> {
        return this.http.get<any>(
            this.urlServiceV1 + 'suppliers/' + id, 
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }

    createSupplier(body: any): Observable<any> {
        return this.http.post<any>(
            this.urlServiceV1 + 'suppliers/',
            body,
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }

    editSupplier(id: number, body: any): Observable<any> {
        return this.http.put<any>(
            this.urlServiceV1 + 'suppliers/' + id,
            body,
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }

    deleteSupplier(id: string): Observable<any> {
        return this.http.delete<any>(
            this.urlServiceV1 + 'suppliers/' + id,
            { 
                headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('token')}`)
            }
        );
    }
}