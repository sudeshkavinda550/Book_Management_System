import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnChanges {
  @Input() book: Book | null = null;
  @Input() isEditMode: boolean = false;
  @Output() bookAdded = new EventEmitter<void>();
  @Output() bookUpdated = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  formData: Book = {
    id: 0,
    title: '',
    author: '',
    isbn: '',
    publicationDate: ''
  };

  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private bookService: BookService) { }

  ngOnChanges(): void {
    if (this.book && this.isEditMode) {
      // Deep copy the book object
      this.formData = { ...this.book };
      
      // Format date for input field (YYYY-MM-DD)
      if (this.formData.publicationDate) {
        this.formData.publicationDate = this.formatDateForInput(this.formData.publicationDate);
      }
    } else {
      this.resetForm();
    }
  }

  /**
   * Format date to YYYY-MM-DD for HTML date input
   */
  private formatDateForInput(dateString: string): string {
    try {
      const date = new Date(dateString);
      
      // Handle invalid dates
      if (isNaN(date.getTime())) {
        return '';
      }
      
      // Get local date parts
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }

  /**
   * Validate ISBN format
   */
  private isValidISBN(isbn: string): boolean {
    // Remove hyphens and spaces
    const cleanISBN = isbn.replace(/[-\s]/g, '');
    
    // Check if it's 10 or 13 digits
    return cleanISBN.length === 10 || cleanISBN.length === 13;
  }

  /**
   * Validate form data
   */
  private validateForm(): boolean {
    this.errorMessage = '';
    
    // Check required fields
    if (!this.formData.title?.trim()) {
      this.errorMessage = 'Title is required!';
      return false;
    }
    
    if (!this.formData.author?.trim()) {
      this.errorMessage = 'Author is required!';
      return false;
    }
    
    if (!this.formData.isbn?.trim()) {
      this.errorMessage = 'ISBN is required!';
      return false;
    }
    
    if (!this.formData.publicationDate) {
      this.errorMessage = 'Publication date is required!';
      return false;
    }
    
    // Validate ISBN format
    if (!this.isValidISBN(this.formData.isbn)) {
      this.errorMessage = 'ISBN must be 10 or 13 digits!';
      return false;
    }
    
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(this.formData.publicationDate)) {
      this.errorMessage = 'Date must be in YYYY-MM-DD format!';
      return false;
    }
    
    // Validate date is not in the future
    const selectedDate = new Date(this.formData.publicationDate);
    const today = new Date();
    if (selectedDate > today) {
      this.errorMessage = 'Publication date cannot be in the future!';
      return false;
    }
    
    return true;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = '';
    
    if (this.isEditMode && this.book) {
      // Update existing book
      this.bookService.updateBook(this.book.id, this.formData).subscribe({
        next: () => {
          this.bookUpdated.emit();
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error updating book:', error);
          this.errorMessage = error.error?.message || 'Failed to update book. Please try again.';
          this.isSubmitting = false;
        }
      });
    } else {
      // Create new book
      this.bookService.createBook(this.formData).subscribe({
        next: () => {
          this.bookAdded.emit();
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error creating book:', error);
          this.errorMessage = error.error?.message || 'Failed to create book. Please try again.';
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.resetForm();
    this.cancelled.emit();
  }

  resetForm(): void {
    this.formData = {
      id: 0,
      title: '',
      author: '',
      isbn: '',
      publicationDate: ''
    };
    this.errorMessage = '';
    this.isSubmitting = false;
  }
}