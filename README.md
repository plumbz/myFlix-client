myFlix-client App

Objective
Using React, build the client-side for an app called myFlix based on its
existing server-side code (REST API and database).

Project Description:
myFlix-client is a web application build using React. This application allows users to browse, search, and explore details about movies, directors, and genres, with additional functionalities for user account management and personalization.

Key Features:
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

Technology Used
    React - For building the user interface.
    Vite - For bundling and serving the app. (replaces Parcel)
    Sass - For custom styles.
    Bootstrap- for styling
 
Installation

Prerequisites
● Node.js

Steps
1. Clone the respository

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