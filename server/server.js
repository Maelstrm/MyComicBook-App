// Requirements
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const entriesRouter = require('./routes/entries.route');
const genresRouter = require('./routes/genres.route');

//configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//setup routes
app.use('/entries', entriesRouter);
app.use('/genres', genresRouter);

//static fiels
app.use(express.static('server/public'));

//start the server
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
});