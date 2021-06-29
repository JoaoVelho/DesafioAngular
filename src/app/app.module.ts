import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';
import { APP_BASE_HREF } from '@angular/common';
import { CreateProductComponent } from './products/create/create.component';
import { EditProductComponent } from './products/edit/edit.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { PurchasesService } from './purchases/purchases.service';
import { CreatePurchaseComponent } from './purchases/create/create.component';
import { StocksComponent } from './stocks/stocks.component';
import { StocksService } from './stocks/stocks.service';
import { EditStockComponent } from './stocks/edit/edit.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SuppliersService } from './suppliers/suppliers.service';
import { CreateSupplierComponent } from './suppliers/create/create.component';
import { EditSupplierComponent } from './suppliers/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    ProductsComponent,
    CreateProductComponent,
    EditProductComponent,
    PurchasesComponent,
    CreatePurchaseComponent,
    StocksComponent,
    EditStockComponent,
    SuppliersComponent,
    CreateSupplierComponent,
    EditSupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ProductsService,
    PurchasesService,
    StocksService,
    SuppliersService,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
