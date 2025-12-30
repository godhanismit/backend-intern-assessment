# User Management System

## Project Overview & Purpose

This project is a User Management System built as part of a backend intern assessment.
It allows users to register, log in, and manage their personal profile, while admin users can manage all users through a protected admin dashboard.

The system demonstrates:

- Authentication using JWT

- Role-based access control (User vs Admin)

- Secure backend APIs

- A clean, responsive frontend

- Real-world deployment setup

## Deployed URLs

- Frontend (Netlify): https://backend-intern-assessment.netlify.app
- Backend API (Render): https://backend-intern-assessment.onrender.com
- API Base URL: https://backend-intern-assessment.onrender.com/api

## Tech Stack Used
### Frontend

- React (Vite)

- Tailwind CSS

- Axios

- React Router

### Backend

- Node.js

- Express.js

- MongoDB (Mongoose)

- JWT Authentication

- bcrypt for password hashing

### Database

- MongoDB Atlas

### Deployment

- Frontend: Netlify

- Backend: Render

## Features
### User Features

- User signup and login

- View profile details

- Update full name and email

- Change password

- Logout functionality

### Admin Features

- Admin-only dashboard

- View all users with pagination

- Activate or deactivate user accounts

- Role-based access control (RBAC)

## Setup Instructions
### Prerequisites

- Node.js (v18+ recommended)

- MongoDB Atlas account

- Git

### Backend Setup

```bash
cd backend
npm install
```


Create a .env file inside the backend folder and add required environment variables (see below).

Run the backend server:

```bash
npm run dev
```


The backend will run on the configured port (default: 5000).

### Frontend Setup

```bash
cd frontend
npm install
```


Create a .env file inside the frontend folder.

Start the frontend:

```bash
npm run dev
```


The frontend will be available at http://localhost:5173.

## Environment Variables
### Backend (backend/.env)
- PORT
- MONGO_URI
- JWT_SECRET

### Frontend (frontend/.env)
- VITE_API_URL

Note: Actual values are intentionally not included for security reasons.

## Testing

Backend APIs are covered with basic unit and integration tests focusing on authentication and authorization flows.

### Tools Used
- Jest
- Supertest

### Running Tests Locally

```bash
cd backend
npm test
```

## CI/CD

GitHub Actions is configured to automatically run backend tests on every push and pull request.


## Deployment Instructions
### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect the GitHub repository
3. Set Root Directory to backend

Use the following commands:

- Build Command: `npm install`

- Start Command: `npm start`

4. Add backend environment variables in Render dashboard
5. Deploy the service

Backend will be accessible via a Render-generated URL.

### Frontend Deployment (Netlify)

1. Create a new site on Netlify
2. Connect the GitHub repository

Set:

- Base directory: frontend

- Build command: npm run build

- Publish directory: dist

Add the environment variable:

```
VITE_API_URL = <backend_render_url>/api
```


Deploy the site

To support client-side routing, a _redirects file is added:

```
/*    /index.html   200
```

## API Documentation
### Authentication APIs
#### Signup

POST /api/auth/signup

Request:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```


Response:

```json
{
  "message": "User registered successfully"
}
```

#### Login

POST /api/auth/login

Request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```


Response:

```json
{
  "token": "jwt_token_here"
}
```

#### Get Current User

GET /api/auth/me

Headers:

Authorization: Bearer <token>


Response:

```json
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "status": "active"
}
```

### Admin APIs
#### Get All Users (Admin Only)

GET /api/users?page=1

Response:

```json
{
  "users": [],
  "total": 10
}
```

#### Update User Status (Admin Only)

PATCH /api/users/:id/status

Request:

```json
{
  "status": "inactive"
}
```


Response:

```json
{
  "message": "User status updated"
}
```

## Admin Access

An admin account is created manually for system management.

Example:

Email: admin@admin.com
Password: Admin@123

## CI/CD

GitHub Actions is configured to automatically run backend tests on every push and pull request.


Admins can access the admin dashboard and manage users.

## Notes

- JWT is stateless, so role changes require re-login

- CORS is enabled to allow frontend-backend communication

- Secrets are never committed to the repository

## Conclusion

This project demonstrates a complete full-stack workflow including authentication, authorization, UI/UX considerations, and production deployment.
It follows best practices suitable for an intern-level backend assessment.
