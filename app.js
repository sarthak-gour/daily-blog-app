//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

let blogs = [];

app.get('/', (req, res) => {
  res.render('home', {blogs: blogs});
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const blog = {
    title : req.body.blogTitle,
    content : req.body.blogContent
  };

  blogs.push(blog);

  res.redirect('/');

});

app.get('/blogs/:blogHeading', (req, res) => {
  blogs.forEach((blog) => {
    if(_.lowerCase(blog.title) === _.lowerCase(req.params.blogHeading)){
      res.render('blog', {blogTitle: blog.title, blogContent: blog.content});
    }
  });
});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
