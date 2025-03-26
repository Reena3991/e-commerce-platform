import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  searchTerm: string = '';
  selectedCategory: string = '';
  products: Product[] = [
    { id: 1, name: 'A great book', price: 100, description: 'A great book', imageUrl: 'assets/images/book.jfif', stock: 20, quantity: 0, category: 'book' },
    { id: 2, name: 'High-quality headphones', price: 150, description: 'High-quality headphones', imageUrl: 'assets/images/headphone.jfif', stock: 20, quantity: 0, category: 'electronics' },
    { id: 3, name: 'Stylish t-shirt', price: 50, description: 'Stylish t-shirt', imageUrl: 'assets/images/tshirt.jfif', stock: 20, quantity: 0, category: 'clothing' },
    { id: 4, name: 'Coffee machine', price: 150, description: 'Coffee machine', imageUrl: 'assets/images/coffeemachine.jfif', stock: 20, quantity: 0, category: 'home kitchen' },
    { id: 5, name: 'kids poem', price: 250, description: 'kids poem', imageUrl: 'assets/images/kidbook.jfif', stock: 20, quantity: 0, category: 'book' },
    { id: 6, name: 'Portable charger', price: 200, description: 'Portable charger', imageUrl: 'assets/images/charger.jfif', stock: 20, quantity: 0, category: 'electronics' },
    { id: 7, name: 'Winter jacket', price: 500, description: 'Winter jacket', imageUrl: 'assets/images/jacket.jfif', stock: 20, quantity: 0, category: 'clothing' },
    { id: 8, name: 'Men shoes', price: 450, description: 'Men shoes', imageUrl: 'assets/images/menshoe.jfif', stock: 20, quantity: 0, category: 'foot wear' },
    { id: 9, name: 'Hair brush', price: 70, description: 'Hair brush', imageUrl: 'assets/images/hairbrush.jfif', stock: 20, quantity: 0, category: 'cosmetics' },
    { id: 10, name: 'Women shoes', price: 400, description: 'Women shoes', imageUrl: 'assets/images/womenshoe.jfif', stock: 20, quantity: 0, category: 'foot wear' },
  ]
    cartCount: number = 0;
    wishlistCount: number = 0;

  constructor(private route: ActivatedRoute, private productService: ProductService,
  private cartService: CartService, private wishlistService: WishlistService) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data: Product) => {
        this.product = data;
      });
    }
    this.getCartCount();
  }

  filterProducts(): Product[] {
    return this.products.filter(product => {
      const matchesSearchTerm = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      return matchesSearchTerm && matchesCategory;
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

 onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  addToCart(product: Product) {
    this.cartService.addItem(product);
    alert(`${product.name} has been added to the cart!`);
    this.getCartCount();
  }

  getCartCount() {
    this.cartCount = this.cartService.getCartCount();
  }

  getWishlistCount() {
    this.wishlistCount = this.wishlistService.getWishlistCount();
  }

   wishlist: Set<number> = new Set();
    toggleWishlist(product: Product) {
      if (this.wishlist.has(product.id)) {
        //this.wishlist.delete(product.id);
      } else {
        this.wishlist.add(product.id);
        this.wishlistService.addItem(product);
      }
        this.getWishlistCount();
    }

    isInWishlist(product: Product): boolean {
      return this.wishlist.has(product.id);
    }
}
