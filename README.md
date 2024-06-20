# DigiMag

## Introduction
**DigiMag** is a full-stack blogging/magazine application built with React, Node.js, and MySQL. It allows users to create, edit, and manage articles with an intuitive and responsive interface.

## Features
- User authentication and authorization
- CRUD operations for articles
- Rich text editor
- Responsive design
- SEO-friendly

## Frontend Plan

### Technologies
- **React:** Used for building the user interface.
- **React Router:** Handles routing for navigation between different pages.
- **Axios:** For making HTTP requests to the backend API.
- **Rich Text Editor:** A WYSIWYG editor for creating and editing articles.

### Components
1. **App Component:** The main component that includes routing setup.
2. **Header Component:** Contains the navigation bar and links to different sections of the application.
3. **Footer Component:** Provides the footer information and links.
4. **Home Component:** Displays the homepage with featured articles and a brief overview of the site.
5. **ArticleList Component:** Shows a list of all articles, possibly with pagination.
6. **Article Component:** Displays a single article with full content.
7. **CreateArticle Component:** Provides a form with a rich text editor for creating new articles.
8. **EditArticle Component:** Similar to CreateArticle but pre-populated with the article's existing content for editing.
9. **Login Component:** Provides a form for user login.
10. **Register Component:** Provides a form for new user registration.
11. **UserProfile Component:** Displays user-specific information and their articles.

### Pages
1. **Home Page:** Displays the latest articles, popular tags, and featured content.
2. **Article Page:** Shows the full content of a selected article.
3. **Create/Edit Article Page:** Contains the form for creating or editing an article.
4. **Login Page:** Provides access to the login form.
5. **Register Page:** Provides access to the registration form.
6. **User Profile Page:** Displays the user’s information and their authored articles.

### State Management
- **React Context API or Redux:** To manage global state, including user authentication status and article data.

### Styling
- **CSS/SCSS:** For styling the components and ensuring a responsive design.
- **BEM Naming Convention:** To maintain organized and maintainable styles.

## Backend Plan

### Technologies
- **Node.js:** JavaScript runtime for building the server-side application.
- **Express:** A web application framework for Node.js to create the API.
- **MySQL:** Relational database for storing user and article data.
- **Sequelize:** ORM for interacting with the MySQL database.
- **JWT (JSON Web Tokens):** For secure user authentication.
- **bcrypt:** For hashing user passwords.

### API Endpoints
1. **User Authentication:**
   - `POST /api/auth/register`: Register a new user.
   - `POST /api/auth/login`: Log in an existing user.
   - `GET /api/auth/me`: Get the authenticated user's profile.

2. **Article Management:**
   - `GET /api/articles`: Get all articles.
   - `GET /api/articles/:id`: Get a single article by ID.
   - `POST /api/articles`: Create a new article (authenticated users only).
   - `PUT /api/articles/:id`: Update an article by ID (authenticated users only).
   - `DELETE /api/articles/:id`: Delete an article by ID (authenticated users only).

### Database Schema
1. **User:**
   - `id`: Primary key
   - `username`: String, unique
   - `email`: String, unique
   - `password`: String, hashed

2. **Article:**
   - `id`: Primary key
   - `title`: String
   - `content`: Text
   - `authorId`: Foreign key to User

### Middleware
- **Authentication Middleware:** Protect routes that require authentication.
- **Error Handling Middleware:** Centralized error handling for API responses.

### Folder Structure
