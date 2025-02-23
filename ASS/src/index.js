// index.js (inside ASS/src)

require('dotenv').config(); // If you have a .env file in ASS/ (the root)

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

// 1. Port from .env or default to 3000
const PORT = process.env.PORT || 3000;

// 2. Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// 3. Serve static files from "src/public"
app.use(express.static(path.join(__dirname, 'public')));
// This resolves to "ASS/src/public" because __dirname is "ASS/src"

// 4. Set up Handlebars
// Your views are at "ASS/src/resources/views"
const viewsPath = path.join(__dirname, 'resources', 'views');
app.engine('.hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(viewsPath, 'layouts'),
  partialsDir: path.join(viewsPath, 'partials'),
}));
app.set('view engine', '.hbs');
app.set('views', viewsPath);

// 5. Example Routes
// Home -> "ASS/src/resources/views/pages/home.hbs"
app.get('/', (req, res) => {
  res.render('pages/home', { title: 'Home' });
});

// About -> "ASS/src/resources/views/pages/about.hbs"
app.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About' });
});

// Login -> "ASS/src/resources/views/user/login.hbs"
app.get('/login', (req, res) => {
  res.render('user/login', { title: 'Login' });
});

// 6. Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
