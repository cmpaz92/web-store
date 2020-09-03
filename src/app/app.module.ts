import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {storageSyncMetaReducer} from 'ngrx-store-persist';

import {ShopReducer} from './store/reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {HeaderComponent} from './components/shared/header/header.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {NavComponent} from './components/shared/nav/nav.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {FiltersComponent} from './components/shopping-cart/filters/filters.component';
import {ProductListComponent} from './components/shopping-cart/product-list/product-list.component';
import {CartComponent} from './components/shopping-cart/cart/cart.component';
import {CartItemComponent} from './components/shopping-cart/cart/cart-item/cart-item.component';
import {ProductItemComponent} from './components/shopping-cart/product-list/product-item/product-item.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./modules/auth/auth.module";
import {ProductDetailComponent} from './components/shopping-cart/product-detail/product-detail.component';
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CheckoutComponent} from './components/shopping-cart/checkout/checkout.component';
import {ProductFormComponent} from './product-form/product-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ShoppingCartComponent,
    FiltersComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductItemComponent,
    ProductDetailComponent,
    CheckoutComponent,
    ProductFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    StoreModule.forRoot({shopping: ShopReducer}, {metaReducers: [storageSyncMetaReducer]}),
    FormsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    AppRoutingModule,
    AuthModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})


export class AppModule {
}
