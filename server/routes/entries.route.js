// Contains the Get, Post, Put, and Delete routes for the entries view.

// Requires
const router = require('express').Router();
const pool = require('../modules/pool');

//GET Rentals
router.get('/allComicEntries', function (req, res) {
    console.log('In GET entries Route');
    const query = `SELECT * FROM "comics" JOIN "genres" ON "comics"."comic_genre" = "genres"."id";
    `;
    pool.query(query).then((results) => {
        //console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting allComicEntries', error);
        res.sendStatus(500);
    });
}); //end GET

router.post('/postNewComic', function (req, res) {
    console.log('In postNewComic', req.body);
    // Send req.body to postgres
    // Add to database
    const newComic = req.body; // data from $http

    // Since the the joined table is connected with the comic genre column, it cannot be entered in the database as null or undefined.
    // If this happens, then it will be left out of the query.
    // Postgresql will set undefined/null genre to 'NA', which will not show up on the dom
    if (newComic.comic_genre == null || newComic.comic_genre == undefined) {
        const query = `INSERT INTO "comics" ("title", "issue", "written_by", "art_by", "cover_by", "publisher", "release_date", "page_count", "image_url" )
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
        pool.query(query, [newComic.title, newComic.issue, newComic.written_by, newComic.art_by, newComic.cover_by, newComic.publisher, newComic.release_date, newComic.page_count, newComic.image_url])
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log('Error in /postNewComic POST request NULL/Undefined', error);
                res.sendStatus(500);
            });
    }
    // If the genre is selected from the drop-down table, then the new item will be sent to the database with all fields
    else {
        const query = `INSERT INTO "comics" ("title", "issue", "written_by", "art_by", "cover_by", "comic_genre", "publisher", "release_date", "page_count", "image_url" )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
        pool.query(query, [newComic.title, newComic.issue, newComic.written_by, newComic.art_by, newComic.cover_by, newComic.comic_genre, newComic.publisher, newComic.release_date, newComic.page_count, newComic.image_url])
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log('Error in /postNewComic POST request valueDEfi', error);
                res.sendStatus(500);
            });
    }
});


// Export module 
module.exports = router;