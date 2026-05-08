require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const API_KEY = process.env.API_KEY || 'my-secret-api-key';

function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!key || key !== API_KEY) {
    return res.status(401).json({ error: 'Invalid or missing API key' });
  }
  next();
}

app.use(requireApiKey);

// Tasks
app.get('/tasks', async (req, res) => {
  const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Parameter "title" is required and must be a non-empty string' });
  }
  const { data, error } = await supabase
    .from('tasks')
    .insert({ title: title.trim(), description: description || '' })
    .select()
    .maybeSingle();
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  if (!id || typeof id !== 'string' || id.trim() === '') {
    return res.status(400).json({ error: 'Parameter "id" is required' });
  }
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: 'Task deleted successfully' });
});

// Goals
app.get('/goals', async (req, res) => {
  const { data, error } = await supabase.from('goals').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.post('/goals', async (req, res) => {
  const { title, description } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Parameter "title" is required and must be a non-empty string' });
  }
  const { data, error } = await supabase
    .from('goals')
    .insert({ title: title.trim(), description: description || '' })
    .select()
    .maybeSingle();
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.delete('/goals/:id', async (req, res) => {
  const { id } = req.params;
  if (!id || typeof id !== 'string' || id.trim() === '') {
    return res.status(400).json({ error: 'Parameter "id" is required' });
  }
  const { error } = await supabase.from('goals').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: 'Goal deleted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (Node.js v${process.versions.node})`);
});
