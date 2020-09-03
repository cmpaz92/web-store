export class Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  media: string;

  constructor(id, name, description = '', price = 0, quantity = 0, media = '') {

    this._id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.media = media;

  }

}
