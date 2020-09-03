import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store'
import {AppState} from "./models/app-state.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Webshop';

  //shoppingItems: Observable<Array<Product>>;
  //newShoppingItem: Product = {id: '', name: ''}

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    // this.shoppingItems = this.store.select(store => store.shopping);
    // this.shoppingItems = this.store.select('shopping');
  }

  addItem() {
    /*this.newShoppingItem.id = uuid();

    this.store.dispatch(new AddToCart(this.newShoppingItem));

    this.newShoppingItem = {id: '', name: ''};*/
  }

  deleteItem(id: string) {
    /* this.store.dispatch(new RemoveFromCart(id));*/
  }
}
