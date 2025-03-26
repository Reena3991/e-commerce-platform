import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cartItems = this.cartService.getCartItems();

  constructor(private cartService: CartService) {}

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeFromCart(itemId: number) {
    this.cartService.removeItem(itemId);
    this.cartItems = this.cartService.getCartItems();
  }
}
