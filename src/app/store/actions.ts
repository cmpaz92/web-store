import {Action} from '@ngrx/store';
import {Product} from './../models/product.model'

export enum ActionTypes {
  Login = '[User] Login',
  Logout = '[User] Logout',
  Add = '[Product] Add to cart',
  Remove = '[Product] Remove from cart',
  LoadItems = '[Products] Load items from server',
  LoadSuccess = '[Products] Load success'
}
/*
export class Login implements Action {
  readonly type = UserActionTypes.LOGIN;
  constructor(public payload: User) {}
 }

export class Logout implements Action {
  readonly type = ActionTypes.Add;

  constructor(public payload: Product) {
  }
}*/

export class AddToCart implements Action {
  readonly type = ActionTypes.Add;

  constructor(public payload: Product) {
  }
}

export class GetItems implements Action {
  readonly type = ActionTypes.LoadItems;
}

export class RemoveFromCart implements Action {
  readonly type = ActionTypes.Remove;

  constructor(public payload: string) {
  }
}

export class LoadItems implements Action {
  readonly type = ActionTypes.LoadSuccess;

  constructor(public payload: Product[]) {
  }
}

export type ActionsUnion = AddToCart | RemoveFromCart | LoadItems | GetItems;
