# Task Management Application

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) with user authentication.

## Features

- User Authentication – Register, login, and logout securely
- Task Management – Create, edit, delete, and mark tasks as complete
- Filtering – View tasks by status (Completed/Pending)
- Responsive UI – Works on mobile, tablet, and desktop
- Form Validation – Frontend + backend error handling
- Priority Levels – Set tasks as Low/Medium/High priority

## Technologies Used

- **Frontend**: React, React Router, Context API, Axios, CSS Modules
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT (Authentiction), Bycrypt
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS Modules, Flexbox, Grid

## Setup Instructions

**Prerequisites**
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- Git
**Installation**
1. Clone the repository
~
bash
git clone https://github.com/dunkel68/Task-Manager.git
cd Task-Manager
~

2. Set up the backend
~
cd server
npm install
cp .env.example .env  # Update with your MongoDB URI & JWT secret
npm run dev
~

3. Set up the frontend
~
cd ../client
npm install
npm start
~

4. Access the app
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Project Structire
task-manager/
├── client/          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.js
├── server/          # Node.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md


# TFuture Improvements

1.	Task Categories/Tags – Organize tasks by labels.
2.	Search Functionality – Filter tasks by keywords.
3.	Email Notifications – Reminders for due tasks.
4.	Drag-and-Drop Reordering – Better task organization.
5.	Unit Testing – Jest + React Testing Library.
