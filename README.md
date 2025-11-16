# Employee-Management-system

📄 EMPLOYEE MANAGEMENT SYSTEM – SUMMARY (PAGE 1)
1. Introduction

The Employee Management System is a full-stack web application designed to streamline the management of employee records within an organization. The system offers functionalities such as user authentication, employee registration, updating employee profiles, photo uploads, and secure record deletion. The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and follows a modular, scalable architecture suitable for real-world business use.

This system enables administrators to efficiently manage employee data through a clean user interface and a secure backend API. All interactions between the client and server are performed using REST APIs, ensuring smooth communication, fast response times, and reliable data processing.

2. Core Features
✔ Secure Login Authentication

Only authorized users can access the Employee Dashboard.

JWT (JSON Web Token) is used to authenticate sessions.

After login, users are redirected to the Employee Management page.

Logout clears the authentication token and denies access to protected routes.

✔ Employee CRUD Operations

The system supports all CRUD functionalities:

Create: Add new employee with photo

Read: Fetch and display employee details

Update: Edit employee data and replace photo

Delete: Remove employee record permanently

✔ Photo Upload & Preview

Using Multer, employee photos are uploaded to the server.

Uploaded images are stored in a dedicated /uploads folder.

React provides live photo preview before submission.

Photos are displayed inside the employee table.

✔ Responsive UI & Modern UX

Clean, centered dashboard

Large headings and card layout

Form modal for add/update employee

Interactive buttons (Edit, Delete)

Table with improved readability and alignment

3. Technologies Used
Frontend:

React.js

React Router

Context API (for state management)

Axios (API communication)

CSS (UI styling)

Backend:

Node.js

Express.js

MongoDB (with Mongoose)

Multer (file uploads)

JWT Authentication

Bcrypt (password hashing)

📄 EMPLOYEE MANAGEMENT SYSTEM – SUMMARY (PAGE 2)
4. System Architecture

The application is divided into two major layers:

A. Backend Architecture
i. Controllers

Handle core operations:

Employee creation

Updating employee details

Fetching employee list

Serving uploaded photos

Authentication (login)

ii. Models

Stores employee schema with fields:

Name

Email

Age

Date of Birth

Address

Photo URL

CreatedAt timestamp

iii. Middleware

Includes:

JWT authentication

File upload processor (Multer)

iv. Routes

REST API endpoints:

POST /auth/login – Authenticate user

GET /employees – List all employees

POST /employees – Add employee

PUT /employees/:id – Update employee

DELETE /employees/:id – Delete employee

v. Database

MongoDB stores all employee records securely.

B. Frontend Architecture
i. Context API

Two global contexts:

AuthContext – login, token, logout

EmployeeContext – CRUD operations & employee list

ii. Components

Employee Table

Employee Form Modal (Add/Edit)

Login Form

ProtectedRoute wrapper

Preview Image UI

iii. Routing

Public route:

/login → Login page

Protected route:

/ → Employee Dashboard

5. Application Workflow (Step-by-Step)
1. Login

User enters email & password

Backend validates credentials using bcrypt

JWT token stored in localStorage

User redirected to dashboard

2. Loading Employee Data

React calls /employees via Axios

Backend fetches records from MongoDB

Data displayed in a table

3. Adding an Employee

User clicks “Add Employee”

A modal form appears

User fills details and uploads photo

Form data (including image) is sent as FormData

Backend stores image + saves employee entry

4. Editing an Employee

Clicking “Edit” loads existing data

Existing photo is previewed

User updates fields

Backend replaces old photo if new one is uploaded

5. Deleting an Employee

Clicking “Delete” removes the entry from database

Photo is also deleted from the server

6. Logout

Logout removes token from localStorage

User is redirected to login

Access to dashboard becomes restricted

6. Conclusion

The Employee Management System is a robust, secure, and user-friendly MERN application that efficiently handles employee operations. With clear separation of backend and frontend logic, modular design, and strong security practices (JWT, encrypted passwords), it is well-suited for use in real organizations and scalable environments.

It demonstrates:
✔ Full-stack development
✔ API design
✔ Authentication implementations
✔ File handling
✔ UI/UX design
✔ State management in React
