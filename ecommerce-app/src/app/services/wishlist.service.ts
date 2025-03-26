import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems: Product[] = [];

  constructor() {
    const storedItems = localStorage.getItem('wishlistItems');
    if (storedItems) {
      this.wishlistItems = JSON.parse(storedItems);
    }
  }

  addItem(product: Product): void {
    this.wishlistItems.push(product);
    this.saveWishlist();
  }

  removeItem(productId: number): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== productId);
    this.saveWishlist();
  }

  getWishListItems(): Product[] {
    return this.wishlistItems;
  }

    getWishlistCount(): number {
      return this.wishlistItems.length;
    }

  private saveWishlist(): void {
    localStorage.setItem('wishlistItems', JSON.stringify(this.wishlistItems));
  }
}
