import {Injectable} from '@angular/core';
import {Product} from "../models/product.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(category?: string, page: number = 1, limit: number = 0): Observable<Product[]> {
    console.log(category == '');
    let params = []
    let url = `${apiUrl}/article/list`;
    if (category != '' && category != null) {
      params.push({type: 'category', value: category})
    }
    if (name != '' && name != null) {
      params.push({type: 'name', value: name})
    }
    if (limit != 0) {
      params.push({type: 'limit', value: limit})
    }
    if (page != 0) {
      params.push({type: 'page', value: page})
    }
    params.forEach(function (value, i) {
      if (i == 0) {
        url += '?'
      } else {
        url += '&'
      }
      url += `${value.type}=${value.value}`
    });
    return this.http.get<Product[]>(url);
  }

  getProductbyId(id: string): Observable<Product> {
    let a = this.http.get<Product>(apiUrl + '/article/' + id);
    console.log(a);
    return a;
  }

  getProduct(id: string): Observable<Product> {

    const url = `${apiUrl}/article/${id}`;
    console.log(this.http.get<Product>(url))
    return this.http.get<Product>(url)
  }

  createProduct(product: any) {
    console.log(product)
    const url = `${apiUrl}/article/create`;
    this.http.post(url, product).subscribe(data => {
      console.log(data)
    })
    return
  }
}

