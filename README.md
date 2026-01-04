# TODO_APP

To-Do List Application

A full-stack To-Do List application built using React + TypeScript (frontend) and Node.js + Express + TypeScript + MySQL (backend).


## Database Setup
CREATE DATABASE todo_app;
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false
);

## .env files
Create .env file using this example.env in both backend/.env.example and frontend/.env.example

## How to Run Locally
-> Clone Repository
cd todo_app

-> Run backend
cd backend
npm install
npm run dev

Backend runs on: http://localhost:5000

-> Run Frontend
cd frontend
npm install
npm run dev





Author
Shivani Nair


