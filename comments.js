// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Middleware
app.use(bodyParser.json());

// Get all comments
app.get('/api/comments', (req, res) => {
  fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }
    res.send(JSON.parse(data));
  });
});

// Add a new comment
app.post('/api/comments', (req, res) => {
  const newComment = req.body;
  fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }
    const comments = JSON.parse(data);
    comments.push(newComment);
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        res.status(500).send('Internal server error');
        return;
      }
      res.send(newComment);
    });
  });
});

// Start web server
app.listen(3000, () => {
  console.log('Web server is running on http://localhost:3000');
});