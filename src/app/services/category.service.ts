import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Object> {

    let url = `${apiUrl}/category/list`;

    return this.http.get<Object[]>(url);
  }
}
