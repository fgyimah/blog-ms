const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const posts = {};

app.get('/posts', (_req, res) => {
  res.json(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, postId, status, content } = data;

    const post = posts[postId];
    const comment = post.comments.find((item) => item.id === id);

    comment.status = status;
    comment.content = content;
  }

  res.send({});
});

app.listen(4002, () => {
  console.log('Query service listening on port 4002');
});
