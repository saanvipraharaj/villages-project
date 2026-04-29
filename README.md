# Villages Project

A full-stack web application that provides fast, searchable access to India’s village-level geographical data. It is designed as a scalable backend system with a modern frontend interface, built for real-world SaaS use cases.

---

## Live Demo

### Frontend (User Interface)
https://villages-project-3vxrn7gkb-saanvipraharajs-projects.vercel.app

### Backend (REST API)
https://villages-project.onrender.com

---

## Overview

This project allows users to search and explore structured geographical data across India, including states, districts, and villages.

It demonstrates a full-stack architecture with a clear separation between frontend and backend services, deployed on cloud platforms.

---

## Features

- Search villages by name  
- View all states  
- Fetch districts by state  
- Fetch villages by district  
- Fast search API with partial matching  
- Pagination support for large datasets  
- Fully deployed cloud architecture  

---

## Tech Stack

### Frontend
- React (Vite)
- Axios
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- CORS

### Deployment
- Frontend: Vercel  
- Backend: Render  
- Database: PostgreSQL (cloud-hosted)  

---

## API Reference

**Base URL:**  
https://villages-project.onrender.com

### Endpoints

```http
GET /states
```
Returns all states
```http
GET /districts?state=STATE_NAME
```

Returns districts under a state
```http
GET /villages?district=DISTRICT_NAME&page=1&limit=50
```
Returns villages under a district
```http
GET /search?q=QUERY
```
Search villages by name

---
### Project Structure
```bash
villages-project/
│
├── frontend/        React frontend (Vite)
├── index.js         Express backend entry point
├── package.json     Backend dependencies
├── vercel.json      Deployment configuration
└── README.md
```
---

### Local Setup
**Backend**
```bash
git clone https://github.com/saanvipraharaj/villages-project.git
cd villages-project
npm install
```

Create a .env file:
```bash
DATABASE_URL=your_postgresql_connection_string
PORT=3000
```
Run server:
```bash
node index.js
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

http://localhost:5173

---

## Environment Variables
**Backend**

-DATABASE_URL → PostgreSQL connection string
-PORT → Server port

**Frontend**

-API base URL → https://villages-project.onrender.com

---

### Future Improvements
- Authentication (JWT-based system)
- Admin dashboard for data management
- Redis caching for performance optimization
- Advanced filtering (state → district → village hierarchy UI)
- Rate limiting and API security layers
- Improved UI/UX for large-scale data browsing

---
**Author**

***Saanvi Praharaj***

---

### Project Goal

This project is part of a larger SaaS architecture vision to build a centralized, scalable geographical data infrastructure for India. It is designed to support applications that require structured village-level data at scale.
