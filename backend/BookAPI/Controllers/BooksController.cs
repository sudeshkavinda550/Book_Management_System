using Microsoft.AspNetCore.Mvc;
using BookAPI.Models;
using BookAPI.Services;

namespace BookAPI.Controllers
{
    /// <summary>
    /// API Controller for managing books
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BookService _bookService;

        public BooksController(BookService bookService)
        {
            _bookService = bookService;
        }

        /// <summary>
        /// GET: api/books
        /// Get all books
        /// </summary>
        [HttpGet]
        public ActionResult<List<Book>> GetAllBooks()
        {
            var books = _bookService.GetAllBooks();
            return Ok(books);
        }

        /// <summary>
        /// GET: api/books/5
        /// Get a specific book by ID
        /// </summary>
        [HttpGet("{id}")]
        public ActionResult<Book> GetBook(int id)
        {
            var book = _bookService.GetBookById(id);
            
            if (book == null)
            {
                return NotFound(new { message = $"Book with ID {id} not found" });
            }

            return Ok(book);
        }

        /// <summary>
        /// POST: api/books
        /// Create a new book
        /// </summary>
        [HttpPost]
        public ActionResult<Book> CreateBook([FromBody] Book book)
        {
            if (book == null)
            {
                return BadRequest(new { message = "Book data is required" });
            }

            if (string.IsNullOrWhiteSpace(book.Title))
            {
                return BadRequest(new { message = "Title is required" });
            }

            if (string.IsNullOrWhiteSpace(book.Author))
            {
                return BadRequest(new { message = "Author is required" });
            }

            var createdBook = _bookService.AddBook(book);
            return CreatedAtAction(nameof(GetBook), new { id = createdBook.Id }, createdBook);
        }

        /// <summary>
        /// PUT: api/books/5
        /// Update an existing book
        /// </summary>
        [HttpPut("{id}")]
        public ActionResult<Book> UpdateBook(int id, [FromBody] Book book)
        {
            if (book == null)
            {
                return BadRequest(new { message = "Book data is required" });
            }

            if (string.IsNullOrWhiteSpace(book.Title))
            {
                return BadRequest(new { message = "Title is required" });
            }

            if (string.IsNullOrWhiteSpace(book.Author))
            {
                return BadRequest(new { message = "Author is required" });
            }

            var updatedBook = _bookService.UpdateBook(id, book);
            
            if (updatedBook == null)
            {
                return NotFound(new { message = $"Book with ID {id} not found" });
            }

            return Ok(updatedBook);
        }

        /// <summary>
        /// DELETE: api/books/5
        /// Delete a book
        /// </summary>
        [HttpDelete("{id}")]
        public ActionResult DeleteBook(int id)
        {
            var result = _bookService.DeleteBook(id);
            
            if (!result)
            {
                return NotFound(new { message = $"Book with ID {id} not found" });
            }

            return Ok(new { message = $"Book with ID {id} deleted successfully" });
        }
    }
}