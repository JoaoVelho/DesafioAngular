import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent implements OnInit {
  authenticated = false;

  constructor() { }

  ngOnInit(): void {
    if (window.localStorage.getItem('token') != null)
      this.authenticated = true;

    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    })
  }

  logout() {
    window.localStorage.removeItem('token');
    
    Emitters.authEmitter.emit(false)
  }
}
