# MyComicBook-App
An M.E.A.N. app for managing my comic book collection.

## Technology

1. Node.js
2. Angular.js
3. AngularMaterials
4. Express
5. Heroku
6. PostgreSQL

## Project Outline

This app is part of a 5 day challenge to create a **full-stack** javascript application.

### Basic features:

- [ ] Add new comic books with properties:
	- [ ] Name
	- [ ] Author
	- [ ] Artist
	- [ ] Absolute Image URL
	- [ ] Date Published
	- [ ] Genre
	- [ ] Page Count
- [ ] Remove comic books
- [ ] Add new Genres
	- [ ] Show number of entries in genre
- [ ] Remove Genres

### Stretch Goals:

- [ ] Angular Material for design
- [ ] Edit genres and comics
- [ ] Ability to search or filter by name or genre
- [ ] Vote up or down an entry
- [ ] Abilty to add favorites and display on a separate route

## Setup
Setup code can also be found in setup.sql
`-- Initializes the 'genres' table
CREATE TABLE genres (
	id SERIAL PRIMARY KEY,
	genre varchar(50) not null,
	cover_url varchar(255)
);

--Initializes Comic table, which will hold basic data about each comic.
-- Depends on the 'genres' table
CREATE TABLE comics (
	id SERIAL PRIMARY KEY,
	title varchar(255) not null,
	issue int,
	written_by varchar(100) not null,
	art_by varchar(100),
	cover_by varchar(100),
	comic_genre int REFERENCES "genres" not null,
	publisher varchar(50),
	release_date DATE not null,
	page_count int,
	image_url varchar(255),
	did_read boolean DEFAULT FALSE,
	favorite boolean DEFAULT FALSE
);


-- Adds starting data for "genres"
INSERT INTO "genres" ("genre", "cover_url")
VALUES
('Action/Adventure', 'https://via.placeholder.com/250x250'),
('Childrens', 'https://via.placeholder.com/250x250'),
('Graphic Novels', 'https://via.placeholder.com/250x250'),
('Fantasy', 'https://via.placeholder.com/250x250'),
('Sci-Fi', 'https://via.placeholder.com/250x250'),
('Horror', 'https://via.placeholder.com/250x250'),
('Literary', 'https://via.placeholder.com/250x250'),
('Biography', 'https://via.placeholder.com/250x250'),
('Pulp', 'https://via.placeholder.com/250x250'),
('Romance', 'https://via.placeholder.com/250x250'),
('Steam Punk', 'https://via.placeholder.com/250x250'),
('Western', 'https://via.placeholder.com/250x250'),
('Miscellaneous', 'https://via.placeholder.com/250x250');

-- Sample Data for "comics"
INSERT INTO "comics" ("title", "issue", "written_by", "art_by", "cover_by", "comic_genre", "publisher", "release_date", "page_count", "image_url", "did_read", "favorite")
VALUES
('The Infinity Gauntlet', '1', 'Jim Starlin', 'George Perez', 'George Perez', '1', 'Marvel', 'July 10, 1991', '256', 'https://via.placeholder.com/150x250', TRUE, TRUE),
('Watchmen', '0', 'Alan Moore', 'Dave Gibbons', 'Dave Gibbons', '4', 'DC Comics', 'April 1, 1995', '416', 'https://via.placeholder.com/150x250', TRUE, FALSE),
('Parasyte', '1', 'Hitoshi Iwaaki', 'Hitoshi Iwaaki', 'Hitoshi Iwaaki', '1', 'Kodansha Comics', 'July 26, 2011', '288', 'https://via.placeholder.com/150x250', FALSE, TRUE),
('Parasyte', '2', 'Hitoshi Iwaaki', 'Hitoshi Iwaaki', 'Hitoshi Iwaaki', '1', 'Kodansha Comics', 'July 26, 2011', '288', 'https://via.placeholder.com/150x250', TRUE, TRUE),
('Batman: The Long Halloween', '0', 'Jeph Loeb', 'Tim Sale', 'Tim Sale', '1', 'DC Comics', 'October 11, 2011', '384', 'https://via.placeholder.com/150x250', FALSE, FALSE)`

## Screenshots
#### Interface
#### Genres Table
![](screenshots/Genres _Table.png)

## Next Steps

## Author
Twitter - @JakehClark <br>
Github - @Maelstrm <br>
LinkedIn - Jakeh Clark