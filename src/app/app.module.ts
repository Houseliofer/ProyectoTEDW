import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule, } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

     
    
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsHeaderComponent } from './pages/home/components/products-header/products-header.component';
import { FiltersComponent } from './pages/home/components/filters/filters.component';
import { ProductBoxComponent } from './pages/home/components/product-box/product-box.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartService } from './services/cart.service';
import { StoreService } from './services/store.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { PrivateComponent } from './pages/private/private.component';
import { ConfigComponent } from './pages/usuario/config.component';
import { ProductDetailComponent } from './pages/product_detail/product-detail.component';
import { ResetPasswordComponent } from './pages/password/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './pages/password/forgot-password/forgot-password.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductBoxComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    PrivateComponent,
    ConfigComponent,
    ProductDetailComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,    
    FooterComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers:  [
    CartService,
    StoreService,
    AuthService,
    JwtHelperService,
    CookieService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    //Token Interceptor
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
