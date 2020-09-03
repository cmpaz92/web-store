import {ActionsUnion, ActionTypes} from './actions';
import {Product} from "../models/product.model";

export const initialState: Array<Product> = [];

export function ShopReducer(state = initialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.LoadSuccess:
      return {
        ...state,
        items: [...action.payload]
      };

    case ActionTypes.Add:
      return [...state, action.payload];

    case ActionTypes.Remove:
      return state.filter(item => item._id !== action.payload);

    default:
      return state;
  }
}
