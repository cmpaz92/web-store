import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../models/product.model";
import {MessengerService} from "../../../../services/messenger.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: Product

  constructor(private msg: MessengerService, private router: Router) {
  }

  ngOnInit(): void {
  }

  addToCart() {
    this.msg.sendMsg(this.productItem)
  }

  goToProduct(id: string) {
    this.router.navigate(['/product', id]);
  }
}
