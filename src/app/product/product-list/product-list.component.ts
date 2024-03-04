import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  constructor(private productService : ProductService, 
              private cartService: CartService, private snakeBar: MatSnackBar){}
  products : Product[]=[];
  filteredProducts : Product[]=[];
  sortOrder: string="";  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data =>{
      this.products = data;
      this.filteredProducts = data;
    })
  }

  addToCart(product : Product): void{
    this.cartService.addCartItem(product).subscribe({
      next:()=>{
        this.snakeBar.open("Product added to cart!","",{
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition:'top'
        });
      }
    });
  }

  applyFilter(event: Event):void{
    let searchTearm = (event.target as HTMLInputElement).value;
    searchTearm = searchTearm.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
                           product.name.toLowerCase().includes(searchTearm));

    this.sortProducts(this.sortOrder);                       
  }

  sortProducts(sortValue : string):void{
    this.sortOrder = sortValue;

    if(this.sortOrder == "priceLowHigh"){
      this.filteredProducts.sort((a,b)=>a.price - b.price)
    }
    else if(this.sortOrder == "priceHighLow"){
      this.filteredProducts.sort((a,b)=>b.price - a.price)
    }
  }
}
