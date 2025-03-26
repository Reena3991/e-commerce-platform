import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReviewComponent } from './components/review/review.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'order-tracking', component: OrderTrackingComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'review/:productId', component: ReviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
