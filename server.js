const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = 'my-secret-apikey-2024';

let tasks = [];
let goals = [];

app.use(express.json());

app.use((req, res, next) => {
  const authorization = req.headers['authorization'];
  if (!authorization || authorization !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: invalid or missing API key' });
  }
  next();
});

app.get('/getTasks', (req, res) => {
  res.json({ tasks });
});

app.get('/getGoals', (req, res) => {
  res.json({ goals });
});

app.post('/addTask', (req, res) => {
  const { name, description, dueDate } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const task = { id: Date.now(), name, description: description || '', dueDate: dueDate || '' };
  tasks.push(task);
  res.status(201).json({ message: 'Task added', task });
});

app.post('/addGoal', (req, res) => {
  const { name, description, dueDate } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const goal = { id: Date.now(), name, description: description || '', dueDate: dueDate || '' };
  goals.push(goal);
  res.status(201).json({ message: 'Goal added', goal });
});

app.delete('/removeTask', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'id is required' });
  }
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const removed = tasks.splice(index, 1)[0];
  res.json({ message: 'Task removed', task: removed });
});

app.delete('/removeGoal', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'id is required' });
  }
  const index = goals.findIndex(g => g.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Goal not found' });
  }
  const removed = goals.splice(index, 1)[0];
  res.json({ message: 'Goal removed', goal: removed });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Key: ${API_KEY}`);
});
