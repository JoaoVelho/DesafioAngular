import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  authenticated = false;
  public isAdm: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const token = window.localStorage.getItem('token') as string;
  
    if (token != null)
      this.authenticated = true;

    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    })
    Emitters.admEmitter.subscribe((adm: boolean) => {
      this.isAdm = adm;
    })

    const tokenDecoded: any = jwt_decode(token);

    if (tokenDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin')
      this.isAdm = true;
  }

  logout() {
    window.localStorage.removeItem('token');
    
    Emitters.authEmitter.emit(false)
    Emitters.admEmitter.emit(false)
  }
}
