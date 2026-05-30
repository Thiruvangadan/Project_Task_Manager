# 📌 Project Management App 

A full-stack project management application with OTP-based authentication, JWT sessions, and task tracking inside projects. Built with a modern MERN-style architecture using PostgreSQL.

---

# 🚀 Features

## 🔐 Authentication

* OTP-based email authentication
* User Signup & Login
* JWT-based session management
* Persistent login sessions

---

## 📁 Projects

* Create new projects
* View all projects
* Delete projects
* Each project includes:

  * Title
  * Description

---

## ✅ Tasks (Inside Projects)

* Create tasks under each project
* Mark tasks as complete / incomplete
* Delete tasks
* Each task includes:

  * Title
  * Status
  * Optional due date

---

## 🧠 State Management

* Redux Toolkit for global state
* Structured store architecture
* Async API handling using Thunks
* Real-time UI updates after API actions

---

# 🛠 Tech Stack

## Frontend

* React Native (Expo)
* Redux Toolkit
* Axios
* React Navigation 

## Backend

* Node.js
* Express.js
* JWT Authentication
* OTP Email Service (SendGrid)
* Middleware & Validation

## Database

* PostgreSQL

---

# 🔐 Authentication Flow

1. User enters email
2. OTP is generated and sent via email
3. User verifies OTP
4. Backend issues JWT token
5. Token is used for authenticated requests

---

# 📡 API Overview

## Auth Routes

* `POST /auth/send-otp`
* `POST /auth/verify-otp`
* `POST /auth/login`
* `POST /auth/signup`

---

## Project Routes

* `GET /projects`
* `POST /projects`
* `DELETE /projects/:id`

---

## Task Routes

* `POST /tasks`
* `GET /tasks/:projectId`
* `PATCH /tasks/:id`
* `DELETE /tasks/:id`

---

# ⚙️ Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=your_verified_email
```

Run backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# 📱 APK

Download APK here:
👉 [https://drive.google.com/your-link](https://drive.google.com/your-link)

---

# 📌 Important Notes

* OTP emails may sometimes appear in spam/junk folder
* If OTP is not received, use “Resend OTP” option
* Ensure correct email is entered during signup

---

✔ Convert this into a GitHub-ready fancy README
✔ Or tailor it exactly to your repo structure

Just tell 👍
