import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

import { Router } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  searchTerm: string = '';
  selectedCategory: string = '';
  cartCount: number = 0;
  wishlistCount: number = 0;

  cartItems: Product[] = [];
  isAccountPanelOpen = false;
  isCartOpen = false;
  imagePath: string = 'assets/images/rklogo.png';

   userProfile = {
      name: 'Reena Kumari',
      email: 'Reena.kumari@example.com',
      phone: '+919234567890',
    };

    orders = [
      { id: 1, productName: 'A Great Book', orderDate: '2023-01-15', status: 'Delivered' },
      { id: 2, productName: 'High-quality Headphones', orderDate: '2023-01-20', status: 'In Transit' },
    ];

  @Output() searchChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();

  constructor( private cartService: CartService, private wishlistService: WishlistService, private router: Router) {}

   ngOnInit() {
     this.cartCount = this.cartService.getCartCount();
     this.wishlistCount = this.wishlistService.getWishlistCount();

    this.cartItems = this.cartService.getCartItems();
  }

  onSearchChange() {
    this.searchChange.emit(this.searchTerm);
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.categoryChange.emit(category);
  }

  openWishlist() {
      this.router.navigate(['/wishlist']);
  }

    openCart() {
    this.router.navigate(['/cart']);
    }

  openAccount() {
      this.isAccountPanelOpen = !this.isAccountPanelOpen;
  }
}
