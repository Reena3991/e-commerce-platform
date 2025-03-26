import { Component } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishListItems = this.wishlistService.getWishListItems();
  cartCount: number = 0;
  constructor(private wishlistService: WishlistService, private cartService: CartService) {}

    addToCart(product: Product) {
      this.cartService.addItem(product);
      alert(`${product.name} has been added to the cart!`);
      this.getCartCount();
      this.removeFromWishlist(product.id);
    }

    getCartCount() {
      this.cartCount = this.cartService.getCartCount();
    }

  removeFromWishlist(itemId: number) {
    this.wishlistService.removeItem(itemId);
    this.wishListItems = this.wishlistService.getWishListItems();
  }
}
