import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';

import { PrivateComponent } from './pages/private/private.component';
import { RoleGuard } from './guards/role.guard';
import { ProductDetailComponent } from './pages/product_detail/product-detail.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: '',
  redirectTo:'home', 
  pathMatch:'full'
},
{
  path:'login',
  component: LoginComponent
},
{
  path:'register',
  component: RegisterComponent
},
{
  path:'private',
  component: PrivateComponent,
  canActivate: [RoleGuard],
  data: {expectedRol: 'admin'}
},
{
  path:'product-detail/:id',
  component: ProductDetailComponent, 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
