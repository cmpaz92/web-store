import {Component, OnInit} from '@angular/core';

import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product.model";
import {Subscription} from "rxjs";
import {CategoryMessengerService} from "../../../services/category-messenger.service";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = []
  filter: string = '';
  subscription: Subscription;
  page: number = 1;
  more: boolean = true;

  constructor(private productService: ProductService, private filtermsg: CategoryMessengerService) {
    this.subscription = this.filtermsg.getFilter().subscribe(message => {
      if (message) {
        this.filter = message;
      } else {
        // clear messages when empty message received
        this.filter = '';
      }
      this.getProducts();
    });
  }

  ngOnInit(): void {

    this.getProducts()
  }

  getProducts() {
    console.log(this.filter);
    this.productService.getProducts(this.filter).subscribe((products) => {
      this.productList = products
    })
  }

  loadMoreProducts() {
    this.page++
    console.log(this.filter);
    this.productService.getProducts(this.filter, this.page).subscribe((products) => {
      console.log(typeof products)
      if (typeof products === 'object') {
        this.productList = [...this.productList, ...products]
      } else {
        this.more = false
      }

    })
    console.log(this.productList);
  }

}
