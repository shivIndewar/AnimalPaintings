import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl+'/products';

  constructor(private httpClient: HttpClient) { }

  getProducts():Observable<Product[]>{
      return this.httpClient.get<Product[]>(this.apiUrl);
  }
}
