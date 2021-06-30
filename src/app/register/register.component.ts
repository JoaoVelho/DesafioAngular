import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Emitters } from '../emitters/emitters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      cpf: '',
      phoneNumber: '',
      address: this.formBuilder.group({
        street: '',
        number: '',
        complement: '',
        cep: '',
        district: '',
        city: '',
        state: '',
      })
    })
  }

  submit(): void {
    this.http.post('https://localhost:5001/api/v1/Clients/register', this.form.getRawValue())
      .subscribe((res: any) => {
        window.localStorage.setItem('token', res.token)
        Emitters.authEmitter.emit(true)

        const tokenDecoded: any = jwt_decode(res.token)
        if (tokenDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin')
          Emitters.admEmitter.emit(true)

        this.router.navigate(['/'])
      },
      err => {
        Emitters.authEmitter.emit(false)
      })
  }
}
