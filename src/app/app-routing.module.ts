import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './modules/shared/components/not-found/not-found.component';
import {LoginComponent} from "./modules/auth/pages/login/login.component";
import {RegisterComponent} from "./modules/auth/pages/register/register.component";

import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {ProductDetailComponent} from "./components/shopping-cart/product-detail/product-detail.component";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CheckoutComponent} from './components/shopping-cart/checkout/checkout.component';
import {LoggedInGuard} from './modules/auth/guards/logged-in/logged-in.guard';
import {ProductFormComponent} from './components/shopping-cart/product-form/product-form.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '', component: ShoppingCartComponent,
  },
  {
    path: 'product/:id', //:type is dynamic here
    component: ProductDetailComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'create',
    component: ProductFormComponent,
    canActivate: [LoggedInGuard],
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [HttpClient]
})
export class AppRoutingModule {
}

class AppRoutingModuleImpl extends AppRoutingModule {
}
