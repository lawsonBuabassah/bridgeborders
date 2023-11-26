const express = require("express");
const app = express();
const serverController = require('./controller/serverController');

const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup static file connections
app.use(express.static(__dirname + "/public/"));


//setting up template/view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//start appController
serverController(app);

// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
