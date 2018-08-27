// Requires
const router = require('express').Router();
const pool = require('../modules/pool');

//GET allComicEntries
router.get('/favorites', function (req, res) {
    console.log('In GET favorites home Route');
    const query = `SELECT * FROM "comics" JOIN "genres" ON "comics"."comic_genre" = "genres"."id"
    WHERE "favorite" IS TRUE;
    `;
    pool.query(query).then((results) => {
        //console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting allComicEntries', error);
        res.sendStatus(500);
    });
}); //end GET

// Export module 
module.exports = router;