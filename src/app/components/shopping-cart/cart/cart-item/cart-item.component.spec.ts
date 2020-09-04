import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartItemComponent} from './cart-item.component';
import {Cart} from 'src/app/models/cart.model';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartItemComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const cartItem = new Cart(123, 'item1', 10, 1)
    this.component.cartItem = cartItem
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
