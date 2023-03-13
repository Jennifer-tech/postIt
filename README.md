# POSTIT

## Overview
A simple social media app. This API makes use of CRUD Operations on Users, Post and Comments

## The API has three main components

* Users: Allows for creating, updating, getting a user, getting all users, loging in a user, logging out a user and deleting users who can access the API.
* Posts: Allows for creating, updating, getting and deleting a post, getting all post.
* Comments: Allows for creating, updating, getting and deleting a comment, getting all comment.

## How To Use

* Clone the repo
* cd into the directory such that you are in **postit**
* Create a new MongoDB database and copy your MONGODB_URI
* Create a .env file at the root of the folder and include your DATABASE_URI and a secret_key to generate tokens in the file in the format below.

> DATABASE_URI = {The DATABASE_URI you created}
> SECRET = {Your secret keyword}


*To run the solution, make sure you have nodejs installed.
* Use the following command in your terminal and to install the necessary dependencies

> npm install
> nodemon src/app

## Data Modelling
click [here](https://drive.google.com/file/d/1z1lSAff_RsuIf8fo75IRZ_x1DlVrd3XF/view?usp=drivesdk) to view link to the Entity Relationship Diagram

## Testing Endpoints
* Postman or other standard tools for testing is required
Below is the link to my API documentation, Click [here]()

## Live Link
click [here]() to see the hosted work
