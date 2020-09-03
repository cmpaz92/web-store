export class Cart {
  _id: string;
  name: string;
  price: number;
  quantity: number;

  constructor(id, name, price = 0, quantity = 0) {

    this._id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;

  }

}
