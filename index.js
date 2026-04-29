require('dotenv').config();
console.log("DB:", process.env.DATABASE_URL ? "FOUND" : "MISSING");

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection (SAFE VERSION)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : false
});

// Prevent silent crash
pool.connect()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection error:", err.message));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Villages API running' });
});

// STATES
app.get('/states', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name FROM state ORDER BY name'
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch states' });
  }
});

// DISTRICTS
app.get('/districts', async (req, res) => {
  const { state } = req.query;

  if (!state) {
    return res.status(400).json({ error: 'State is required' });
  }

  try {
    const result = await pool.query(`
      SELECT d.name
      FROM district d
      JOIN state s ON d.state_id = s.id
      WHERE LOWER(s.name) = LOWER($1)
      ORDER BY d.name
    `, [state]);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch districts' });
  }
});

// VILLAGES
app.get('/villages', async (req, res) => {
  const { district, page = 1, limit = 50 } = req.query;

  if (!district) {
    return res.status(400).json({ error: 'District is required' });
  }

  const safeLimit = Math.min(parseInt(limit) || 50, 100);
  const offset = (page - 1) * safeLimit;

  try {
    const result = await pool.query(`
      SELECT v.name
      FROM village v
      JOIN sub_district sd ON v.sub_district_id = sd.id
      JOIN district d ON sd.district_id = d.id
      WHERE LOWER(d.name) = LOWER($1)
      ORDER BY v.name
      LIMIT $2 OFFSET $3
    `, [district, safeLimit, offset]);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch villages' });
  }
});

// SEARCH
app.get('/search', async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.json({ success: true, data: [] });
  }

  try {
    const result = await pool.query(`
      SELECT v.name, d.name AS district
      FROM village v
      JOIN sub_district sd ON v.sub_district_id = sd.id
      JOIN district d ON sd.district_id = d.id
      WHERE v.name ILIKE $1
      ORDER BY v.name
      LIMIT 50
    `, [`%${q}%`]);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// START SERVER (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
