import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateProductComponent } from './products/create/create.component';
import { EditProductComponent } from './products/edit/edit.component';
import { ProductsComponent } from './products/products.component';
import { CreatePurchaseComponent } from './purchases/create/create.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/create', component: CreateProductComponent },
  { path: 'products/edit/:id', component: EditProductComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'purchases/create', component: CreatePurchaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
