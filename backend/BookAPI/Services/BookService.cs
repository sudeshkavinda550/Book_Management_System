using BookAPI.Models;

namespace BookAPI.Services
{
    /// <summary>
    /// Service for managing book operations
    /// </summary>
    public class BookService
    {
        // In-memory storage for books
        private static List<Book> _books = new List<Book>
        {
            new Book
            {
                Id = 4,
                Title = "The Hungry Ghosts",
                Author = "Shyam Selvadurai",
                ISBN = "978-0-7710-7888-8",
                PublicationDate = "2013-03-09"
            },
            new Book
            {
                Id = 5,
                Title = "Running in the Family",
                Author = "Michael Ondaatje",
                ISBN = "978-0-7710-6860-5",
                PublicationDate = "1982-10-20"
            },
            new Book
            {
                Id = 6,
                Title = "The Seven Moons of Maali Almeida",
                Author = "Shehan Karunatilaka",
                ISBN = "978-1-3985-0565-6",
                PublicationDate = "2022-08-01"
            },
            new Book
            {
                Id = 7,
                Title = "Gamperaliya",
                Author = "Martin Wickramasinghe",
                ISBN = "978-9-5502-1045-3",
                PublicationDate = "1944-01-01"
            },
            new Book
            {
                Id = 8,
                Title = "Chinaman: The Legend of Pradeep Mathew",
                Author = "Shehan Karunatilaka",
                ISBN = "978-1-84614-500-9",
                PublicationDate = "2010-05-03"
            }
        };

        private static int _nextId = 9;

        /// <summary>
        /// Get all books
        /// </summary>
        public List<Book> GetAllBooks()
        {
            return _books;
        }

        /// <summary>
        /// Get a book by ID
        /// </summary>
        public Book? GetBookById(int id)
        {
            return _books.FirstOrDefault(b => b.Id == id);
        }

        /// <summary>
        /// Add a new book
        /// </summary>
        public Book AddBook(Book book)
        {
            book.Id = _nextId++;
            _books.Add(book);
            return book;
        }

        /// <summary>
        /// Update an existing book
        /// </summary>
        public Book? UpdateBook(int id, Book updatedBook)
        {
            var existingBook = _books.FirstOrDefault(b => b.Id == id);
            if (existingBook == null)
            {
                return null;
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.PublicationDate = updatedBook.PublicationDate;

            return existingBook;
        }

        /// <summary>
        /// Delete a book
        /// </summary>
        public bool DeleteBook(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null)
            {
                return false;
            }

            _books.Remove(book);
            return true;
        }
    }
}