namespace BookAPI.Models
{
    /// <summary>
    /// Represents a book in the library system
    /// </summary>
    public class Book
    {
        /// <summary>
        /// Unique identifier for the book
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Title of the book
        /// </summary>
        public string Title { get; set; } = string.Empty;

        /// <summary>
        /// Author of the book
        /// </summary>
        public string Author { get; set; } = string.Empty;

        /// <summary>
        /// ISBN
        /// </summary>
        public string ISBN { get; set; } = string.Empty;

        /// <summary>
        /// Publication date of the book
        /// </summary>
        public string PublicationDate { get; set; } = string.Empty;
    }
}