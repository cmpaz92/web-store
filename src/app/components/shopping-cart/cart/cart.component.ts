import {Component, OnInit} from '@angular/core';
import {MessengerService} from "../../../services/messenger.service";

import {Store} from '@ngrx/store'
import {AppState} from "../../../models/app-state.model";
import {Product} from "../../../models/product.model";
import {AddToCart, RemoveFromCart} from "../../../store/actions";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Cart} from "../../../models/cart.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('heightGrow', [
      state('closed', style({
        // height: 30,
        bottom: '0px'
        // opacity: '0'
      })),
      state('open', style({
        //  height: '165px',
        bottom: '185px'
        // opacity: '100%'
      })),
      transition('* => *', animate(150))
    ]),
  ]
})
export class CartComponent implements OnInit {
  cartShow = "closed";
  cartItems: Array<Cart> = []
  cartTotal = 0;


  //shoppingItems: Array<Product>;

  constructor(private msg: MessengerService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    //this.shoppingItems = this.store.select(store => store.shopping);

    this.handleSubscription()
    this.loadCartItems()
    this.calcCartTotal()
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

  toggleCart(): void {
    (this.cartShow == "closed") ? this.cartShow = "open" : this.cartShow = "closed";
    console.log(this.cartShow);
  }

  addToCart(product: Product) {
    console.log(product.quantity)
    let productincart = false;
    for (let i in this.cartItems) {
      if (this.cartItems[i]._id === product._id) {
        console.log("true!")
        productincart = true;
        break;
      }
      console.log("break")
    }
    console.log("not break")
    if (!productincart) {
      console.log("true too!")
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
    console.log(id)
  }
}
