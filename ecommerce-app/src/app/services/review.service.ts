import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review, NewReview } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8081/api/reviews';

  constructor(private http: HttpClient) {}

  getReviewsForProduct(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/product/${productId}`);
  }

  addReview(productId:number, newReview: NewReview): Observable<Review> {
    return this.http.post<Review>(this.baseUrl, newReview);
  }
}
