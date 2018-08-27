// Contains the Get, Post, Put, and Delete routes for the genres view.

// Requires
const router = require('express').Router();
const pool = require('../modules/pool');

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
}); //end GET

// POST new genre
router.post('/postNewGenre', function (req, res) {
    console.log('in postNewGenre', req.body);

    const genreToAdd = req.body;

    if (!genreToAdd.cover_url) {
        console.log('no cover URL');

        const query = `INSERT INTO "genres" ("genre")
                VALUES ($1);`;
        pool.query(query, [genreToAdd.genre])
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log('Error in /postNewComic POST request NULL/Undefined', error);
                res.sendStatus(500);
            });
    } else {
        console.log('cover url');

        const query = `INSERT INTO "genres" ("genre", "cover_url")
                VALUES ($1, $2);`;
        pool.query(query, [genreToAdd.genre, genreToAdd.cover_url])
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log('Error in /postNewComic POST request NULL/Undefined', error);
                res.sendStatus(500);
            });
    }
}); // end POST

router.delete('/deleteGenre/:genre', function (req, res) {
    const genre = req.params.genre;

    const queryNullText = 'DELETE FROM "genres" WHERE "genre" LIKE $1;';
        pool.query(queryNullText, [genre])
            .then((result) => {
                console.log('Delete genre successful', genre);
                res.sendStatus(200);
            })
            // error handling
            .catch((err) => {
                console.log('error deleting genre', err);
                res.sendStatus(500);
            });
})

// Export module 
module.exports = router;