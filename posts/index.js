const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const posts = {};

app.get('/posts', (_req, res) => {
  res.json(posts);
});
app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  res.status(201).json(posts[id]);
});

app.listen(4000, () => {
  console.log('Posts server listening on port 4000');
});
