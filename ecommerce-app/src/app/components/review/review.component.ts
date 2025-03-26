import { Component, Input } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  @Input() productId!: number;
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.reviewService.getReviewsForProduct(this.productId).subscribe((data: Review[]) => {
      this.reviews = data;
    });
  }

  addReview(newReview: Review) {
    this.reviewService.addReview(this.productId, newReview).subscribe((response) => {
      this.ngOnInit();
    });
  }
}
