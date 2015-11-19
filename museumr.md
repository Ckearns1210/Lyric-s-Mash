# MUSEUM.R

### Learning Objectives

- Create two models and establish a one-to-many relationship between them.
- Practice setting up a server.
- Practice utilizing a query string to formulate a response to a request.

---

The application you'll be building is an interface to a database of artists and paintings.

- The user should be able to view all the artists.
- The user should be able to view all the information for an artist.
- The user should be able to edit the information for an artist.
- The user should be able to show a single artist and his/her paintings.
- The user should be able to add a painting for a particular artist.
- The user should be able to add a new artist.
- The user should be able to delete an artist.
- The user should be able to view all the paintings.
- The user should be able to delete a painting.

**YOU HAVE BEEN PROVIDED WITH A CSS FILE.**

### Step 1

Make a new folder and subfolders for your application. Use npm to install the following dependencies:
- express
- morgan
- body-parser
- mongoose

### Step 2

Set up the Mongoose models for the artist and painting collections.

##### Artist

An Artist should have the following attributes:
- name
- img_url
- nationality
- birthYear
- description

##### Painting

A Painting should have the following attributes:
- title
- img_url
- year_made

### Step 3

Run the provided `seed.js` file to seed the database.

### Step 4

##### Routes

### Artist

Define the 5 RESTful actions for an artist.

After you have defined these five routes, make sure you can successfully perform the actions through your chrome console before moving on to paintings. Each action should have the appropriate JSON response.

### Painting

Paintings will need an Index route, a Create Route, and a Delete Route.

##### Index

Should render all of the paintings.

##### Create

Should create a new painting. The path for this route should include the artists id.

##### Delete

Should delete a painting.

### Step 5

Now that the painting routes have been defined, edit the artist show route to show that the response includes the artist's paintings.


**FRONT END**

The CSS has been provided for you. Examine it closely for guidance in how to name and classify your HTML elements.

### Step 6

Use Bower to install the front-end dependencies:
- jQuery
- Underscore
- Handlebars

### Step 7

In the HTML file, build the following Handlebars templates:
- artist
- painting
- new artist form
- edit artist form
- new painting form
- edit artist form

### Step 8
In the HTML file, build the divs and other body elements, using the CSS file as a guide.

### Step 9
Build the `app.js` file with click events, AJAX calls, and rendering functions.

### Bonus!
- Add a museum model and introduce a many-to-many relationship between museums and artists.
- Implement user sessions.
