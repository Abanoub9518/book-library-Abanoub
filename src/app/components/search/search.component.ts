import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Book } from "../../models/book.model";
import { BookService } from "../../services/book.service";
import { CommonModule } from "@angular/common";
import { BookCardComponent } from "../book-card/book-card.component";

@Component({
  selector: "app-search",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BookCardComponent],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.scss",
})
export class SearchComponent {
  searchForm: FormGroup;
  allBooks: Book[] = []; // Store all books initially
  filteredBooks: Book[] = []; // Store the filtered books
  isSearching = false;
  errorMessage: string | null = null;

  // Options for the search key
  searchOptions = [
    { label: "Title", value: "title" },
    { label: "Author", value: "author" },
    { label: "Subject", value: "subject" },
  ];

  constructor(private bookService: BookService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: [""],
      searchKey: ["title"], // Default search key is 'title'
    });
  }

  ngOnInit(): void {
    this.bookService.getBooksBySubject("finance").subscribe({
      next: (response) => {
        this.allBooks = response.works;
        this.filteredBooks = response.works; // Initially show all books
        console.log(this.filteredBooks);
      },
      error: (err) => {
        this.errorMessage = "Failed to load books. Please try again later.";
      },
    });
  }

  onSearch(): void {
    const query = this.searchForm.get("query")?.value.toLowerCase();
    const searchKey = this.searchForm.get("searchKey")?.value;

    if (query && searchKey) {
      this.isSearching = true;
      this.errorMessage = null;

      // Filter books based on search key
      this.filteredBooks = this.allBooks.filter((book) => {
        if (searchKey === "title") {
          return book.title.toLowerCase().includes(query);
        } else if (searchKey === "author") {
          return book.authors.filter((author) => {
            author.name.toLowerCase().includes(query);
          });
        } else if (searchKey === "subject") {
          return book.title.toLowerCase().includes(query);
        }
        return false;
      });

      this.filteredBooks = this.filteredBooks.slice(0, 9);
    } else {
      this.errorMessage = "Please enter a valid search term.";
    }
  }
}
