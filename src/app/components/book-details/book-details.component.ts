import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BookService } from "../../services/book.service";
import { Author, Book, Response } from "../../models/book.model";
import { CommonModule } from "@angular/common";
import { of, switchMap } from "rxjs";

@Component({
  selector: "app-book-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./book-details.component.html",
  styleUrl: "./book-details.component.scss",
})
export class BookDetailsComponent {
  book: any; // Define a proper interface or type for your book
  loading: boolean = true;
  books: Book[] = [];
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const key = this.route.snapshot.paramMap.get("key");

    this.bookService
      .getBooksBySubject("Finance")
      .pipe(
        switchMap((response: any) => {
          this.books = response.works.slice(0, 9);
          console.log(this.books);

          // Find the specific book by key
          const foundBook = this.books.find(
            (book) => book.key === `/works/${key}`
          );
          if (foundBook) {
            // If the book is found, return it as an observable
            return of(foundBook);
          } else {
            throw new Error("Book key is missing or not found in the list");
          }
        })
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.book = data; // Set the found book
          this.loading = false;
        },
        (error) => {
          console.error(error);
          this.loading = false;
        }
      );
  }
  getAuthorNames(authors: Author[]): string {
    return authors.map((author) => author.name).join(", ");
  }
}
