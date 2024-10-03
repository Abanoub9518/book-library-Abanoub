import { Injectable } from "@angular/core";
import { Book } from "../models/book.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<Book[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor() {}

  // Add a book to the wishlist
  addBookToWishlist(book: Book): void {
    const currentWishlist = this.wishlistSubject.getValue();
    const exists = currentWishlist.some((item: Book) => item.key === book.key);

    if (!exists) {
      const updatedWishlist = [...currentWishlist, book];
      this.wishlistSubject.next(updatedWishlist);
      console.log("Book added to wishlist", book);
    } else {
      console.log("Book is already in the wishlist");
    }
  }

  // Remove a book from the wishlist
  removeBookFromWishlist(bookId: string): void {
    const currentWishlist = this.wishlistSubject.getValue();
    const updatedWishlist = currentWishlist.filter(
      (book: Book) => book.key !== bookId
    );

    this.wishlistSubject.next(updatedWishlist);
    console.log("Book removed from wishlist", bookId);
  }

  // Get the current wishlist
  getWishlist(): Book[] {
    return this.wishlistSubject.getValue();
  }

  private wishlist: Set<string> = new Set();

  toggleWishlist(book: Book) {
    console.log(book);

    if (this.wishlist.has(book.key)) {
      this.wishlist.delete(book.key);
      this.removeBookFromWishlist(book.key);
    } else {
      this.wishlist.add(book.key); // Add to wishlist
      this.addBookToWishlist(book);
    }
  }

  isInWishlist(bookKey: string): boolean {
    return this.wishlist.has(bookKey); // Check if book is in the wishlist
  }
}
