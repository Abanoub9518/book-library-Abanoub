import { Component } from "@angular/core";
import { BookCardComponent } from "../book-card/book-card.component";
import { Book } from "../../models/book.model";
import { BookService } from "../../services/book.service";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [BookCardComponent, HeaderComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooksBySubject("Finance").subscribe((response) => {
      console.log(response);
      this.books = response.works.slice(0, 9); // Get only the first 9 books
    });
  }
}
