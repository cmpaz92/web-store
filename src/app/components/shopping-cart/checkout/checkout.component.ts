import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/modules/auth/services/auth.service';
import {Cart} from 'src/app/models/cart.model';
import {MessengerService} from 'src/app/services/messenger.service';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/models/app-state.model';
import {Product} from 'src/app/models/product.model';
import {AddToCart, RemoveFromCart} from 'src/app/store/actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  user: any = null;
  cartItems: Array<Cart> = []
  cartTotal = 0;

  constructor(private authService: AuthService, private msg: MessengerService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn()
    this.handleSubscription()
    this.loadCartItems()
    this.calcCartTotal()
  }

  loadUser() {
    this.user = null;

    this.authService.getMe().subscribe(user => {
      this.user = user;
    });
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((product: Product) => {
      this.addToCart(product)
    })
    this.msg.getMsg().subscribe((product: Product) => {
      this.loadCartItems();
    })
  }

  loadCartItems() {
    this.store.select(store => store.shopping).subscribe(data => {
      this.cartItems = data;
    });
  }

  addToCart(product: Product) {
    let productincart = false;
    for (let i in this.cartItems) {
      if (this.cartItems[i]._id === product._id) {
        productincart = true;
        break;
      }
    }
    if (!productincart) {
      this.cartItems = [
        new Cart(product._id, product.name, product.price, 1)
      ]
      this.store.dispatch(new AddToCart(product));
    }


    this.calcCartTotal()
    //this.store.dispatch(new AddToCart(product));
  }

  calcCartTotal() {
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      this.cartTotal += (item.price)
    })
  }

  deleteItem(id: string) {
    this.store.dispatch(new RemoveFromCart(id));
  }
}
