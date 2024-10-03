import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "../../models/book.model";
import { WishlistService } from "../../services/wishlist.service";
import { BookCardComponent } from "../book-card/book-card.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-wishlist",
  standalone: true,
  imports: [BookCardComponent, CommonModule],
  templateUrl: "./wishlist.component.html",
  styleUrl: "./wishlist.component.scss",
})
export class WishlistComponent {
  wishlist$!: Observable<Book[]>;

  constructor(private wishlistService: WishlistService) {
    this.wishlist$ = this.wishlistService.wishlist$;
  }

  ngOnInit(): void {}

  removeFromWishlist(key: string): void {
    this.wishlistService.removeBookFromWishlist(key);
  }
}
