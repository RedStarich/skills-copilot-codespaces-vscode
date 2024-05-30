//Create web server
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Create a variable that will hold the comments
let comments = [];

//Create a route that will return all the comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

//Create a route that will add a new comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.json(newComment);
});

//Create a route that will delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  comments = comments.filter((comment, index) => index !== id);
  res.json(comments);
});

//Create a route that will update a comment
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const updatedComment = req.body;
  comments = comments.map((comment, index) => {
    if (index == id) {
      return updatedComment;
    }
    return comment;
  });
  res.json(comments);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});