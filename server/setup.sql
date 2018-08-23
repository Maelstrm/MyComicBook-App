CREATE DATABASE "comic_books"

-- Initializes the 'genres' table
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
('Batman: The Long Halloween', '0', 'Jeph Loeb', 'Tim Sale', 'Tim Sale', '1', 'DC Comics', 'October 11, 2011', '384', 'https://via.placeholder.com/150x250', FALSE, FALSE)