import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../models/product.model";
import {MessengerService} from "../../../services/messenger.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() productItem: Product

  product: Product;

  constructor(private route: ActivatedRoute, private msg: MessengerService, private router: Router, private productService: ProductService) {

  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
    console.log(this.product);
  }

  addToCart() {
    this.msg.sendMsg(this.productItem)
  }

  goToProduct(id: string) {
    this.router.navigate(['/product', id]);
  }

}
