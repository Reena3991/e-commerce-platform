export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  content: string;
  createdAt: Date;
}

export interface NewReview {
  productId: number;
  userId: number;
  rating: number;
  content: string;
}
