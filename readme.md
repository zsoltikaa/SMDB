# SMDB (Series & Movies Database)

<img src="https://skillicons.dev/icons?i=html,js,css,php,tailwind,mysql" />

SMDB is a comprehensive web-based application that allows users to explore, search, and manage a collection of movies and series. This project leverages **AngularJS**, **PHP**, and **MySQL** to dynamically load and display movie entries from a database. The application allows users to easily search for their favorite movies, view detailed information, and link to external streaming platforms.

## Features

- **Search by Title**: Users can search for movies and series by their title, using a search bar located on the homepage.
- **Sort Entries**: Movies and series can be sorted by different attributes, including title, release date, or director, making it easy to find content based on preferences.
- **Movie Details**: When a user hovers on a movie, detailed information about the movie is displayed. This includes:
  - Title
  - Director
  - Release Date
  - Description
  - Cast (Actors)
  - IMDB Rating
  - Link to streaming platforms (e.g., Netflix, Amazon Prime)
- **Watch Now**: A "Watch Now" button that links directly to streaming services where the movie can be watched.
- **Responsive Design**: The application is fully responsive, ensuring it works seamlessly on both desktop and mobile devices.
- **Dynamic Content**: The content is dynamically fetched from the MySQL database and updated in real-time.

## Tech Stack

- **Frontend**:
  - **AngularJS** (1.8.2): Used for building the dynamic single-page application (SPA). It handles data binding, controller management, and UI updates.
  - **Tailwind CSS**: A utility-first CSS framework that allows for fast and efficient styling.
  - **Font Awesome**: Icons for better visual appeal and user interface design.
  - **HTML5** & **CSS3**: For structuring and styling the webpage.
  
- **Backend**:
  - **PHP**: PHP handles backend requests, such as querying the MySQL database for movie entries and handling user interactions with the database.
  - **MySQL**: The relational database management system used to store movie data (e.g., title, description, release date, actors, ratings, etc.).
  
- **Database**:
  - **MySQL Database**: Stores information about movies and series. Each movie/series entry includes data such as the title, description, release date, actors, director, IMDB rating, and a link to the streaming platform.
  
## Installation

Follow these steps to set up the SMDB project locally on your machine.

### 1. Clone the Repository

Clone the repository to your local machine to get started:

```bash
git clone https://github.com/yourusername/smdb.git
cd smdb
