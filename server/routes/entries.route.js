// Contains the Get, Post, Put, and Delete routes for the entries view.

// Requires
const router = require('express').Router();
const pool = require('../modules/pool');

//GET allComicEntries
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

// POST new comic
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

// Route for Deleting comic from database
router.delete('/deleteComic/:title/:issue/:writer/', function (req, res) {
    const title = req.params.title;
    const issue = req.params.issue;
    const writer = req.params.writer;

    console.log('id to delete: ', title, issue, writer);

    if (issue >= 0) {
        // IF the issue number is defined, then it will be used to narrow the query

        const queryText = 'DELETE FROM "comics" WHERE "title" LIKE $1 AND "issue" = $2 AND "written_by" LIKE $3;';
        pool.query(queryText, [title, issue, writer])
            .then((result) => {
                console.log('Deletion (w/Issue) successful', title, issue, writer);
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log('error making delete (w/issue) query', error);
                res.sendStatus(500);
            });

    } else {
        // Prepared statement for delete if the issue number is null or undefined.
        // Null requires a different statement than a string
        const queryNullText = 'DELETE FROM "comics" WHERE "title" LIKE $1 AND "written_by" LIKE $2;';
        pool.query(queryNullText, [title, writer])
            .then((result) => {
                console.log('Deletion (null issue) successful', title, issue, writer);
                res.sendStatus(200);
            })
            // error handling
            .catch((err) => {
                console.log('error making delete (null issue) query:', err);
                res.sendStatus(500);
            });
    }
}); // closing delete request

//GET allgenres
router.get('/allGenres', function (req, res) {
    console.log('In GET allGenres Route');
    const query = `SELECT * FROM "genres";
    `;
    pool.query(query).then((results) => {
        //console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting allGenres Route', error);
        res.sendStatus(500);
    });
});

// Export module 
module.exports = router;