import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = environment.apiUrl + "/cart";
  private apiCheckOutUrl = environment.apiUrl + "/chckout";
 
  constructor(private httpClient : HttpClient) { }

  getCartItems():Observable<Product[]>{
      return this.httpClient.get<Product[]>(this.apiUrl);
  }

  addCartItem(product:Product): Observable<Product>{
    return this.httpClient.post<Product>(this.apiUrl, product);
  }

  clearCart(): Observable<void>{
      return this.httpClient.delete<void>(this.apiUrl);
  }

  checkOut(products:Product[]):Observable<void>{
    return this.httpClient.post<void>(this.apiCheckOutUrl, products);
  }
}
