import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  isEditing: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  /**
   * Load all books from the API
   */
  loadBooks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading books:', error);
        
        if (error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please make sure the backend is running on http://localhost:5000';
        } else {
          this.errorMessage = error.error?.message || 'Failed to load books. Please try again.';
        }
        
        this.isLoading = false;
      }
    });
  }

  /**
   * Edit a book
   */
  editBook(book: Book): void {
    this.selectedBook = { ...book };
    this.isEditing = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  /**
   * Delete a book
   */
  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.successMessage = 'Book deleted successfully!';
          this.loadBooks();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          this.errorMessage = error.error?.message || 'Failed to delete book. Please try again.';
        }
      });
    }
  }

  /**
   * Handle book added event
   */
  onBookAdded(): void {
    this.loadBooks();
    this.successMessage = 'Book added successfully!';
    setTimeout(() => this.successMessage = '', 3000);
  }

  /**
   * Handle book updated event
   */
  onBookUpdated(): void {
    this.selectedBook = null;
    this.isEditing = false;
    this.loadBooks();
    this.successMessage = 'Book updated successfully!';
    setTimeout(() => this.successMessage = '', 3000);
  }

  /**
   * Cancel editing
   */
  cancelEdit(): void {
    this.selectedBook = null;
    this.isEditing = false;
    this.errorMessage = '';
  }
}