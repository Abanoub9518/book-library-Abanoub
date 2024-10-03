import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Author, Book } from "../../models/book.model";
import { WishlistService } from "../../services/wishlist.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-book-card",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./book-card.component.html",
  styleUrl: "./book-card.component.scss",
})
export class BookCardComponent {
  @Input() books!: Book[];
  wishlist: Set<string> = new Set();

  constructor(private wishlistService: WishlistService) {}

  getAuthorNames(authors: Author[]): string {
    return authors.map((author) => author.name).join(", ");
  }

  addToWishlist(book: Book): void {
    // console.log(book);
    this.wishlistService.addBookToWishlist(book);
  }
  toggleWishlist(book: Book) {
    this.wishlistService.toggleWishlist(book);
  }

  isInWishlist(book: Book): boolean {
    return this.wishlistService.isInWishlist(book.key);
  }
}
