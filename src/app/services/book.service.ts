import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book, Response } from "../models/book.model";

@Injectable({
  providedIn: "root",
})
export class BookService {
  private apiUrl = "https://openlibrary.org";
  constructor(private http: HttpClient) {}

  getBooksBySubject(subject: string): Observable<Response> {
    return this.http.get<Response>(`/subjects/${subject}.json?details=false`);
  }

  getBookDetails(books: Book[], key: string): any {
    console.log(books, "kkkk", `/works/${key}`);
    return books.find((book) => book.key === `/works/${key}`);
  }
}
