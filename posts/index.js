const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const posts = {};

app.get('/posts', (_req, res) => {
  res.json(posts);
});
app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  try {
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'PostCreated',
      data: posts[id],
    });
  } catch (error) {
    console.error(error);
  }

  res.status(201).json(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received event', req.body.type);

  res.send({ status: 'OK' });
});

app.listen(4000, () => {
  console.log('Version update!');
  console.log('Posts service listening on port 4000');
});
