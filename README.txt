Book Management System
A simple web application to manage your book collection. Add, view, edit, and delete books with ease!


Features
View all your books in a clean list

Add new books with title, author, ISBN, and publication date

Edit existing book details

Delete books you no longer need



Tech Stack
Frontend: Angular (HTML, CSS, TypeScript)

Backend: ASP.NET Web API (C#)

Data Storage: In-memory list



Getting Started
Follow these simple steps to run the application:

Step 1: Clone the Repository

git clone [https://github.com/sudeshkavinda550/Book_Management_System] or use github Desktop
cd BookManagementSystem
Step 2: Run the Backend
Open the backend folder: cd backend\BookAPI

type: dotnet run

The API will start at http://localhost:5000

Step 3: Run the Frontend
Open a new terminal

Navigate to the frontend folder:


cd frontend\book-app
Install required packages
npm install

Start the Angular application:
ng serve

Open your browser and visit:
http://localhost:4200
That's it! Your book management app is ready!


Using the Application
View Books: All your books appear on the main page

Add a Book: Click "Add New Book", fill the form, and submit

Edit a Book: Click the "Edit" button next to any book

Delete a Book: Click the "Delete" button (confirm before deleting)