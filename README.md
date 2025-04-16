## myFlix-client App
myFlix-client is a web application build using React. This application allows users to browse, search, and explore details about movies, directors, and genres, with additional functionalities for user account management and personalization.

## Objective
Using React, build the client-side for an app called myFlix based on its
existing server-side code (REST API and database).


## Key Features:
Main view
● Returns ALL movies to the user (each movie item with an image, title, and description)
● Filtering the list of movies with a “search” feature
● Ability to select a movie for more details
● Ability to log out
● Ability to navigate to Profile view
● Ability to add and remove a movie fron the favorite list

Single Movie view
● Returns data (description, genre, director, image) about a single movie to the user
● Ability to add and remove a movie fron the favorite list

Login view
● Allows users to log in with a username and password

Signup view
● Allows new users to register (firstname, lastname, username, password, email, date of birth)

Profile view
● Displays user registration details
● Allows users to update their info (firstname, lastname, username, password, email, date of birth)
● Displays favorite movies
● Allows users to remove a movie from their list of favorites
● Allows existing users to unregister

## Technology Used
    React - For building the user interface.
    Vite - For bundling and serving the app. (replaces Parcel)
    Sass - For custom styles.
    Bootstrap- for styling
---

## Installation

Prerequisites
● Node.js

Steps
   ```bash
 git clone https://github.com/kittykatkaro/myFLix-client.git
   cd myFLix-client
   ```
2. Install the right dependencies:
npm install -vite
npm install --save react react-dom
npm install -bootstrap
npm istall -react-router
npm istall react-router-dom


3. Create the following files:
myFlix-client/src/index.jsx
myFlix-client/src/index.scss
myFlix-client/src/index.html

4.Building an App buy installing the following:
npm run dev/ nmp run build

---
## Usage

- **Register:** Sign up with a new account.
- **Login:** Log in with your username and password.
- **Browse:** Browse the movie collection and click on any movie to view details.
- **Manage Favorites:** Use the heart icon to add/remove movies from your favorites list.
- **Profile:** Update your user information and view your favorite movies. 
- Open the app in a browser at `http://localhost:1234/`.
- Register for a new account or log in with existing credentials.
- Browse the list of movies and view details about genres and directors.
- Use the "Add to Favorites" button to manage your favorite movies.
- Access your profile to update personal information or deregister your account.

---
myFLix API Repository: https://github.com/plumbz/movie-api
