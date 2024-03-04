import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  constructor(private cartService : CartService){}
  cartItems: Product[]=[];
  totalPrice:number=0;

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data=>{
      this.cartItems = data;
      this.totalPrice = this.getTotalPrice();
    })
  }

  getTotalPrice(): number{
    let total: number=0;

    for (let item of this.cartItems) {
        total += item.price;
    }
    return total;
  }

  clearCartItems():void{
    this.cartService.clearCart().subscribe();
  }

  checkout():void{
    this.cartService.checkOut(this.cartItems).subscribe();
  }

}
